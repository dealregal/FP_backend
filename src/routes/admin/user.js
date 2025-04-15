const mongoose = require("mongoose");
const MongoID = mongoose.Types.ObjectId;

const Users = mongoose.model("users");
const UserWalletTracks = mongoose.model("userWalletTracks");
const Shop = mongoose.model("shop");
const express = require("express");
const router = express.Router();
const config = require("../../../config");
const commonHelper = require("../../helper/commonHelper");
const mainCtrl = require("../../controller/adminController");
const logger = require("../../../logger");
const { registerUser } = require("../../helper/signups/signupValidation");
const {
  getUserDefaultFields,
  saveGameUser,
} = require("../../helper/signups/appStart");
const walletActions = require("../../roulette/updateWallet");
const GameUser = mongoose.model("users");
const RouletteTables = mongoose.model("RouletteTables");
const leaveTableActions = require("../../roulette/leaveTable");
const commandAcions = require("../../helper/socketFunctions");
const CONST = require("../../../constant");
const PlayingTablesModel = mongoose.model("RouletteTables");

/**
 * @api {post} /admin/lobbies
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.get("/UserList", async (req, res) => {
  try {
    console.log("requet => ", req.query.Id);
    console.log("requet => type ", req.query.type);

    let userList = [];
    let totalRecords = 0;
    let totalPages = 0;
    const page = req.query.page || 0;
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;

    const nameFilter = req.query.name;
    let fromDate = req.query.startDate; // Start date (Dynamic)
    let toDate = req.query.endDate; // End date (Dynamic)

    // Convert to Date objects
    const createdAtFilter = {};
    if (fromDate) createdAtFilter.$gte = new Date(fromDate);
    if (toDate) createdAtFilter.$lte = new Date(toDate);
    const totalCountPipeline = [
      {
        $match: {
          ...(nameFilter ? { name: { $regex: nameFilter, $options: "i" } } : {}),
          ...(Object.keys(createdAtFilter).length ? { createdAt: createdAtFilter } : {}),
        },
      },
      { $count: "totalRecords" },
    ];

    const totalCountResult = await Users.aggregate(totalCountPipeline);
    totalRecords = totalCountResult.length ? totalCountResult[0].totalRecords : 0;
    console.log(totalRecords)
    totalPages = Math.ceil(totalRecords / limit);

    if (req.query.type == "Admin") {
      const pipeline = [
        // 1. Match users with filtering conditions
        {
          $match: {
            ...(nameFilter ? { name: { $regex: nameFilter, $options: "i" } } : {}),
            ...(Object.keys(createdAtFilter).length ? { createdAt: createdAtFilter } : {}),
          },
        },

        // 2. Lookup to join RouletteUserHistory
        {
          $lookup: {
            from: "RouletteUserHistory",
            let: { userId: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$userId", "$$userId"] },
                },
              },
              {
                $group: {
                  _id: null,
                  totalPlay: { $sum: "$play" },
                  totalWon: { $sum: "$won" },
                  history: { $push: "$$ROOT" },
                },
              },
              {
                $addFields: {
                  endPoints: { $subtract: ["$totalPlay", "$totalWon"] },
                  margin: { $multiply: ["$totalPlay", 0.025] },
                },
              },
            ],
            as: "historyData",
          },
        },
        { $unwind: { path: "$historyData", preserveNullAndEmptyArrays: true } },

        // 3. Lookup agent details
        {
          $lookup: {
            from: "agent",
            localField: "agentId",
            foreignField: "_id",
            as: "agent_data",
          },
        },
        { $unwind: { path: "$agent_data", preserveNullAndEmptyArrays: true } },

        // 4. Lookup sub-agent (shop) details
        {
          $lookup: {
            from: "shop",
            localField: "agentId",
            foreignField: "_id",
            as: "sub_agent_data",
          },
        },
        { $unwind: { path: "$sub_agent_data", preserveNullAndEmptyArrays: true } },

        // 5. Lookup admin details
        {
          $lookup: {
            from: "admin",
            localField: "agentId",
            foreignField: "_id",
            as: "admin_data",
          },
        },
        { $unwind: { path: "$admin_data", preserveNullAndEmptyArrays: true } },

        // 6. Lookup to fetch agent details of the shop (who created the shop)
        {
          $lookup: {
            from: "agent",
            localField: "sub_agent_data.agentId",
            foreignField: "_id",
            as: "shop_agent_data",
          },
        },
        { $unwind: { path: "$shop_agent_data", preserveNullAndEmptyArrays: true } },

        // 7. Project final output
        {
          $project: {
            username: 1,
            name: 1,
            id: 1,
            mobileNumber: 1,
            "counters.totalMatch": 1,
            profileUrl: 1,
            email: 1,
            uniqueId: 1,
            isVIP: 1,
            chips: 1,
            referralCode: 1,
            createdAt: 1,
            lastLoginDate: 1,
            status: 1,
            agentId: 1,

            // Agent Details
            agentDetails: {
              name: "$agent_data.name",
              id: "$agent_data._id",
            },

            // Sub-Agent (Shop) Details
            subAgent: {
              id: "$sub_agent_data._id",
              name: "$sub_agent_data.name",
              agentId: "$sub_agent_data.agentId",
            },

            // Agent Details of Shop (Who created the shop)
            subAgentByAgent: {
              id: "$shop_agent_data._id",
              name: "$shop_agent_data.name",
            },

            // Admin Details
            adminDetails: {
              name: "$admin_data.name",
              id: "$admin_data._id",
            },

            // Roulette History Data
            totalPlayPoints: "$historyData.totalPlay",
            totalWonPoints: "$historyData.totalWon",
            endPoints: "$historyData.endPoints",
            margin: "$historyData.margin",
          },
        },

        // 8. Pagination
        { $skip: skip },
        { $limit: limit },
      ];

      // Run the pipeline
      userList = await Users.aggregate(pipeline);

    } else if (req.query.type == "Agent") {
      let totalsubagent = await Shop.find(
        { agentId: MongoID(req.query.Id) },
        { _id: 1 }
      );

      console.log("totalsubagent ", totalsubagent);
      let totalid = [];
      for (let i = 0; i <= totalsubagent.length - 1; i++) {
        totalid.push(MongoID(totalsubagent[i]._id));
      }

      // userList = await Users.find(
      //   { agentId: { $in: totalid } },
      //   {
      //     username: 1,
      //     name: 1,
      //     id: 1,
      //     mobileNumber: 1,
      //     "counters.totalMatch": 1,
      //     profileUrl: 1,
      //     email: 1,
      //     uniqueId: 1,
      //     isVIP: 1,
      //     chips: 1,
      //     referralCode: 1,
      //     createdAt: 1,
      //     lastLoginDate: 1,
      //     status: 1,
      //   }
      // );
      userList = await Users.aggregate([
        {
          $match: { agentId: { $in: totalid } },
        },
        {
          $lookup: {
            from: "shop",
            localField: "agentId",
            foreignField: "_id",
            as: "sub_agent_data",
          },
        },
        { $unwind: { path: "$sub_agent_data", preserveNullAndEmptyArrays: true } },

        {
          $project: {
            username: 1,
            name: 1,
            id: 1,
            mobileNumber: 1,
            "counters.totalMatch": 1,
            profileUrl: 1,
            email: 1,
            uniqueId: 1,
            isVIP: 1,
            chips: 1,
            referralCode: 1,
            createdAt: 1,
            lastLoginDate: 1,
            status: 1,
            "subAgentDetails.id": "$sub_agent_data._id",
            "subAgentDetails.name": "$sub_agent_data.name",
            "subAgentDetails.agentId": "$sub_agent_data.agentId",
          },
        },

        { $skip: skip },
        { $limit: limit },
      ]);
    } else if (req.query.type == "Shop") {
      userList = await Users.find(
        { agentId: MongoID(req.query.Id) },
        {
          username: 1,
          name: 1,
          id: 1,
          mobileNumber: 1,
          "counters.totalMatch": 1,
          profileUrl: 1,
          email: 1,
          uniqueId: 1,
          isVIP: 1,
          chips: 1,
          referralCode: 1,
          createdAt: 1,
          lastLoginDate: 1,
          status: 1,
        }
      );
    }
    logger.info("admin/dahboard.js post dahboard  error => ", userList);
    const response = {
      totalRecords,
      totalPages,
      currentPage: page,
      users: userList,
    };

    res.json(response);
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {get} /admin/lobbies
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.get("/agent/UserList", async (req, res) => {
  try {
    console.log("requet => ", req.query.Id);
    console.log("requet => type ", req.query.type);
    let userList = [];
    if (req.query.type == "Agent") {
      const datapipeline = [
        {
          $match: {
            agentId: new mongoose.Types.ObjectId(req.query.Id), // Convert to ObjectId.
          },
        },
        {
          $project: {
            _id: 0, // Include the `_id` field.
            agentId: "$_id", // Rename `_id` to `subAgentId`.
          },
        },
      ];
      // all sub agent where agent is added sub agent
      const result = await Shop.aggregate(datapipeline);
      const subAgentsIds = result.map((doc) => doc.agentId);
      const agentId = new mongoose.Types.ObjectId(req.query.Id);
      const pipeline = [
        // 1. Match users (Optional: Filter specific users or agentId)
        {
          $match: {
            agentId: { $in: [...subAgentsIds, agentId] }, // Match agentId for both sub-agents and the main agent.
          },
        },
        // 2. Lookup to join RouletteUserHistory
        {
          $lookup: {
            from: "RouletteUserHistory", // Collection name of RouletteUserHistory
            let: { userId: { $toString: "$_id" } }, // Convert _id to string
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$userId", "$$userId"], // Match userId from RouletteUserHistory
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  totalPlay: { $sum: "$play" }, // Sum of play points
                  totalWon: { $sum: "$won" }, // Sum of won points
                  history: { $push: "$$ROOT" }, // Preserve all history records
                },
              },
              {
                $addFields: {
                  endPoints: { $subtract: ["$totalPlay", "$totalWon"] }, // End points calculation
                  margin: { $multiply: ["$totalPlay", 0.025] }, // Margin calculation
                },
              },
            ],
            as: "historyData", // Output field name for history data
          },
        },
        // 3. Unwind history data to access computed values
        {
          $unwind: {
            path: "$historyData",
            preserveNullAndEmptyArrays: true, // Optional: Keep users with no history
          },
        },
        // 4. Lookup sub-agent (shop) details
        {
          $lookup: {
            from: "shop",
            localField: "agentId",
            foreignField: "_id",
            as: "sub_agent_data",
          },
        },
        { $unwind: { path: "$sub_agent_data", preserveNullAndEmptyArrays: true } },
        // 5. Project final output with all user fields and aggregated history data
        {
          $project: {
            username: 1,
            name: 1,
            id: 1,
            mobileNumber: 1,
            "counters.totalMatch": 1,
            profileUrl: 1,
            email: 1,
            uniqueId: 1,
            isVIP: 1,
            chips: 1,
            referralCode: 1,
            createdAt: 1,
            lastLoginDate: 1,
            status: 1,
            totalPlayPoints: "$historyData.totalPlay", // Total play points
            totalWonPoints: "$historyData.totalWon", // Total won points
            endPoints: "$historyData.endPoints", // End points
            margin: "$historyData.margin", // Margin
            "subAgentDetails.id": "$sub_agent_data._id",
            "subAgentDetails.name": "$sub_agent_data.name",
            "subAgentDetails.agentId": "$sub_agent_data.agentId",
          },
        },
      ];

      // Run the pipeline
      userList = await Users.aggregate(pipeline);
      return res.json({ userList });
    }
    const pipeline = [
      // 1. Match users (Optional: Filter specific users or agentId)
      {
        $match: {
          agentId: new mongoose.Types.ObjectId(req.query.Id), // Match agentId for both sub-agents and the main agent.
        },
      },
      // 2. Lookup to join RouletteUserHistory
      {
        $lookup: {
          from: "RouletteUserHistory", // Collection name of RouletteUserHistory
          let: { userId: { $toString: "$_id" } }, // Convert _id to string
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$userId", "$$userId"], // Match userId from RouletteUserHistory
                },
              },
            },
            {
              $group: {
                _id: null,
                totalPlay: { $sum: "$play" }, // Sum of play points
                totalWon: { $sum: "$won" }, // Sum of won points
                history: { $push: "$$ROOT" }, // Preserve all history records
              },
            },
            {
              $addFields: {
                endPoints: { $subtract: ["$totalPlay", "$totalWon"] }, // End points calculation
                margin: { $multiply: ["$totalPlay", 0.025] }, // Margin calculation
              },
            },
          ],
          as: "historyData", // Output field name for history data
        },
      },
      // 3. Unwind history data to access computed values
      {
        $unwind: {
          path: "$historyData",
          preserveNullAndEmptyArrays: true, // Optional: Keep users with no history
        },
      },
      // 4. Project final output with all user fields and aggregated history data
      {
        $project: {
          username: 1,
          name: 1,
          id: 1,
          mobileNumber: 1,
          "counters.totalMatch": 1,
          profileUrl: 1,
          email: 1,
          uniqueId: 1,
          isVIP: 1,
          chips: 1,
          referralCode: 1,
          createdAt: 1,
          lastLoginDate: 1,
          status: 1,
          totalPlayPoints: "$historyData.totalPlay", // Total play points
          totalWonPoints: "$historyData.totalWon", // Total won points
          endPoints: "$historyData.endPoints", // End points
          margin: "$historyData.margin", // Margin
        },
      },
    ];

    // Run the pipeline
    userList = await Users.aggregate(pipeline);
    return res.json({ userList });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    console.log(error, "error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/UserData
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.get("/UserData", async (req, res) => {
  try {
    console.info("requet => ", req.query);
    //
    const userInfo = await Users.findOne(
      { _id: new mongoose.Types.ObjectId(req.query.userId) },
      {
        username: 1,
        id: 1,
        loginType: 1,
        profileUrl: 1,
        mobileNumber: 1,
        email: 1,
        uniqueId: 1,
        "counters.totalMatch": 1,
        deviceType: 1,
        chips: 1,
        referralCode: 1,
        createdAt: 1,
        lastLoginDate: 1,
        status: 1,
      }
    );

    logger.info("admin/dahboard.js post dahboard  error => ", userInfo);

    res.json({ userInfo });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/AddUser
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.post("/AddUser", async (req, res) => {
  try {
    console.log("req ", req.body);

    let response = {
      mobileNumber: req.body.mobileNumber,
      username: req.body.name,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isVIP: 1,
      country: req.body.country,
      agentId: req.body.agentId,
      profileUrl: "upload/avatar/1.jpg",
    };

    console.log("response  :::::::::::: response ", response);

    logger.info("Register User Request Body =>", response);
    //const { mobileNumber } = response;

    let query = { name: req.body.name };
    let result = await Users.findOne(query, {});
    console.log("result ", result);

    if (!result) {
      let defaultData = await getUserDefaultFields(response);
      logger.info("registerUser defaultData : ", defaultData);

      let userInsertInfo = await saveGameUser(defaultData);
      logger.info("registerUser userInsertInfo : ", userInsertInfo);

      if (userInsertInfo) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/lobbies
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.delete("/DeleteUser/:id", async (req, res) => {
  try {
    console.log("req ", req.params.id);

    const RecentUser = await Users.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });

    logger.info("admin/dahboard.js post dahboard  error => ", RecentUser);

    res.json({ status: "ok" });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/lobbies
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.put("/addMoney", async (req, res) => {
  try {
    console.log("Add Money ", req.body);
    //const RecentUser = //await Users.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})
    if (req.body.adminname != "Super Admin") {
      const agentInfo = await Shop.findOne(
        { _id: new mongoose.Types.ObjectId(req.body.adminid) },
        { name: 1, chips: 1 }
      );

      console.log("agentInfo ", agentInfo);

      if (agentInfo != null && agentInfo.chips < Number(req.body.money)) {
        res.json({
          status: false,
          msg: "not enough chips to adding user wallet",
        });
        return false;
      }

      const userInfo = await Users.findOne(
        { _id: new mongoose.Types.ObjectId(req.body.userId) },
        { name: 1 }
      );

      await walletActions.deductshopWallet(
        req.body.adminid,
        -Number(req.body.money),
        2,
        "Add Chips to User",
        "roulette",
        agentInfo.name,
        req.body.adminid,
        req.body.userId,
        userInfo.name
      );

      await walletActions.addWalletAdmin(
        req.body.userId,
        Number(req.body.money),
        2,
        "Sub Agent Addeed Chips",
        "roulette",
        agentInfo.name,
        req.body.adminid
      );

      logger.info("admin/dahboard.js post dahboard  error => ");

      res.json({ status: "ok", msg: "Successfully Credited...!!" });
    } else {
      await walletActions.addWalletAdmin(
        req.body.userId,
        Number(req.body.money),
        2,
        "Agent Addeed Chips",
        "roulette",
        req.body.adminname,
        req.body.adminid
      );

      logger.info("admin/dahboard.js post dahboard  error => ");

      res.json({ status: "ok", msg: "Successfully Credited...!!" });
    }
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");
    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/UpdatePassword
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.put("/UpdatePassword", async (req, res) => {
  try {
    console.log("UpdatePassword", req.body);
    await Users.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.userId) },
      {
        $set: {
          password: req.body.password,
        },
      }
    );

    //await walletActions.addWalletAdmin(req.body.userId, Number(req.body.money),2, "Agent Addeed Chips","roulette",req.body.adminname,req.body.adminid);

    logger.info("admin/dahboard.js post dahboard  error => ");

    res.json({ status: "ok" });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/deductMoney
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */

router.put("/deductMoney", async (req, res) => {
  try {
    // console.log("deductMoney Request Body:", req.body);

    const userId = new mongoose.Types.ObjectId(req.body.userId); // Convert to ObjectId

    // Find user details
    const userInfo = await Users.findOne(
      { _id: userId },
      { name: 1, chips: 1 }
    );
    // Check if the user is currently active in a game
    const playingTablesModelPipeline = [
      {
        $match: {
          "playerInfo.playerId": userId, 
        },
      },
      {
        $project: {
          activePlayers: {
            $filter: {
              input: "$playerInfo",
              as: "player",
              cond: { $eq: ["$$player.playerId", userId] }, 
            },
          },
        },
      },
      {
        $unwind: {
          path: "$activePlayers",
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $project: {
          _id: 0,
          playerId: "$activePlayers.playerId",
          name: "$activePlayers.name",
        },
      },
    ];
    
    const activeUser = await PlayingTablesModel.aggregate(playingTablesModelPipeline);
    
    // console.log("Active User:", activeUser); return; 

    // If the user is active, prevent deduction
    if (activeUser.length > 0) {
      return res.json({
        status: false,
        msg: "User is currently active in a game. Cannot deduct money.",
      });
    }

    console.log("User Info:", userInfo);

    if (!userInfo || userInfo.chips < Number(req.body.money)) {
      return res.json({
        status: false,
        msg: "Not enough chips to deduct from user wallet.",
      });
    }

    await walletActions.deductWallet(
      req.body.userId,
      -Number(req.body.money),
      2,
      "Sub Agent deduct Chips",
      "roulette",
      req.body.adminname,
      req.body.adminid
    );

    if (req.body.adminname !== "Super Admin") {
      await walletActions.addshopWalletAdmin(
        req.body.adminid,
        Number(req.body.money),
        2,
        "User Deduct Chips Added",
        "roulette",
        req.body.adminname,
        req.body.adminid,
        req.body.userId,
        userInfo.name
      );
    }

    logger.info("admin/dahboard.js post dashboard success");

    res.json({ status: "ok", msg: "Successfully Debited...!!" });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);

    res.status(500).json({ status: "error", message: "Internal Server Error", error });
  }
});


/**
 * @api {post} /admin/K
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.put("/kycInfo", async (req, res) => {
  try {
    console.log("kycInfo ", req.body);
    //const RecentUser = //await Users.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})

    logger.info("admin/dahboard.js post dahboard  error => ");

    res.json({ status: "ok" });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/UserData
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.get("/UserInfoPrint", async (req, res) => {
  try {
    console.info("requet => ", req.query);
    //
    //const userInfo = await Users.findOne({ _id: new mongoose.Types.ObjectId(req.query.userId) }, { agentId:1,username: 1 })

    //logger.info('admin/dahboard.js post dahboard  error => ', userInfo);
    //const AgentInfo = await Agent.findOne({ _id: new mongoose.Types.ObjectId(userInfo.agentId) }, { name: 1 })

    const TotalBetCount = await UserWalletTracks.find({
      userId: new mongoose.Types.ObjectId(req.query.userId),
      trnxType: "2",
    }).count();
    const TotalWinCount = await UserWalletTracks.find({
      userId: new mongoose.Types.ObjectId(req.query.userId),
      trnxType: "4",
    }).count();

    res.json({
      agentName: "AgentInfo.name",
      date: new Date(),
      TotalBetCount: TotalBetCount,
      TotalWinCount: TotalWinCount,
    });
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/deductMoney
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.put("/blockandunblock", async (req, res) => {
  try {
    console.log("blockandunblock ", req.body);
    //const RecentUser = //await Users.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)})

    if (req.body.userId != undefined && req.body.isblock != undefined) {
      await Users.updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.userId) },
        { $set: { status: req.body.isblock } }
      );

      let userinfo = await Users.findOne({
        _id: new mongoose.Types.ObjectId(req.body.userId),
      });

      let gwh1 = {
        "playerInfo._id": MongoID(req.body.userId),
      };
      let tableInfo = await RouletteTables.findOne(gwh1, {
        "playerInfo.$": 1,
      }).lean();
      logger.info("JoinTable tableInfo : ", JSON.stringify(tableInfo));

      if (tableInfo != null) {
        // sendEvent(client, CONST.ROULETTE_GAME_JOIN_TABLE, requestData, false, "Already In playing table!!");
        // delete client.JT

        await leaveTableActions.leaveTable(
          {
            reason: "autoLeave",
          },
          {
            uid: tableInfo.playerInfo[0]._id.toString(),
            tbid: tableInfo._id.toString(),
            seatIndex: tableInfo.playerInfo[0].seatIndex,
            sck: tableInfo.playerInfo[0].sck,
          }
        );
      }
      if (userinfo != null && userinfo.sckId != undefined) {
        commandAcions.sendDirectEvent(userinfo.sckId, CONST.BLOCKPLAYER, {
          msg: "Check YourOops! It looks like there's an issue with your internet connection. Please check your connection and try again.",
        });
      }

      res.json({ status: "ok" });
    } else {
      console.log("false");
      res.json({ status: false });
    }

    logger.info("admin/dahboard.js post dahboard  error => ");
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * @api {post} /admin/user/check-username
 * @apiName  add-bet-list
 * @apiGroup  Admin
 * @apiHeader {String}  x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} badges Array of badges document
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.post("/check-username", async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required." });
    }

    // Check if the username exists
    const user = await GameUser.findOne({ name });

    if (user) {
      return res
        .status(200)
        .json({
          success: true,
          exists: true,
          message: "name already exists.",
        });
    } else {
      return res
        .status(200)
        .json({
          success: true,
          exists: false,
          message: "name is available.",
        });
    }
  } catch (error) {
    logger.error("admin/dahboard.js post bet-list error => ", error);
    //res.send("error");

    res.status(config.INTERNAL_SERVER_ERROR).json(error);
  }
});

async function createPhoneNumber() {
  const countryCode = "91";

  // Generate a random 9-digit mobile number
  const randomMobileNumber =
    Math.floor(Math.random() * 9000000000) + 1000000000;

  // Concatenate the country code and the random mobile number
  const indianMobileNumber = countryCode + randomMobileNumber;

  return indianMobileNumber;
}


const {myIo} = require("../../controller/socket-server");
const { sendEvent, sendDirectEvent } = require('../../helper/socketFunctions');
router.get("/logoutUser", async (req, res) => {
  try {
    console.log("Received logout request:", req.query);

    const _id = req.query.playerId;
    if (!_id) {
      console.log("Error: User ID is missing");
      return res.status(400).json({ status: false, message: "User ID is required" });
    }

    const userId = new mongoose.Types.ObjectId(_id);
    console.log("Converted user ID:", userId);

    // Step 1: Check if user exists
    const user = await GameUser.findById(userId);
    if (!user) {
      console.log("Error: User not found");
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Step 2: Remove the user from the table
    const table = await PlayingTablesModel.findOne({ "playerInfo.playerId": userId });
    if (table && Array.isArray(table.playerInfo)) {
      const updatedPlayerInfo = table.playerInfo.filter(player => player?.playerId?.toString() !== _id);
      const newActivePlayerCount = Math.max(table.activePlayer - 1, 0);

      await PlayingTablesModel.updateOne(
        { _id: table._id },
        { $set: { playerInfo: updatedPlayerInfo, activePlayer: newActivePlayerCount } }
      );
    }

    // Step 3: Check if user is already logged out
    if (!user.sckId || user.sckId === "") {
      console.log("User already logged out");
      return res.json({ status: false, message: "User already logged out" });
    }
    // Step 4: Remove the user's socket ID from the database
    if (myIo && myIo.sockets) {
      console.log("Emitting logout event for user:", user.sckId);
      sendDirectEvent(user.sckId,"USER_LOGGED_OUT",{ status: true, message: "You have been logged out" });
    }
    // try {
    //   console.log("Emitting logout event for user:", user.sckId);
    //   myIo.sockets.to(user.sckId).emit("USER_LOGGED_OUT", { status: true, message: "You have been logged out" });
    // } catch (socketError) {
    //   console.error("Socket error:", socketError);
    // }
    // Step 5: Set sckId to empty string
    await GameUser.updateOne({ _id: userId }, { $set: { sckId: "" } });

    return res.json({ status: true, message: "User logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});


router.get("/exp", async (req, res) => {
  if (myIo && myIo.sockets) {
    console.log("Emitting experience event");
    sendEvent(myIo.sockets, "SAMPLE_FROM_ROUTES", {});
    return res.json({ status: false, message: "Send" });
  }else{
    return res.json({ status: false, message: "Not Send" });
  }
  
});

router.get("/sendDirect", async (req, res) => {
  const _id = req.query.playerId;
  const userId = new mongoose.Types.ObjectId(_id);
  const user = await GameUser.findById(userId);
  if (myIo && myIo.sockets) {
    console.log("Emitting experience event");
    sendDirectEvent(user.sckId,"USER_LOGGED_OUT",{ status: true, message: "You have been logged out" });
    return res.json({ status: false, message: "Send" });
  }else{
    return res.json({ status: false, message: "Not Send" });
  }
  
});

/**
 * @api {get} /agent/activeUsers
 * @apiGroup Agent
 * @apiHeader {String} x-access-token Admin's unique access-key
 * @apiSuccess (Success 200) {Array} activeUsers Array of active users with sckId not empty
 * @apiError (Error 4xx) {String} message Validation or error message.
 */
router.get("/activeUsers", async (req, res) => {
  try {
    const usersWithSckId = await GameUser.find({
      sckId: { $ne: "" } // Matches users where sckId is NOT an empty string
    }, {
      _id: 1, name: 1, username: 1, uniqueId: 1, chips: 1, sckId: 1 // Project only required fields
    });

    return res.json({ success: true, data: usersWithSckId });
  } catch (error) {
    console.error("Error fetching users with sckId:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});



module.exports = router;
