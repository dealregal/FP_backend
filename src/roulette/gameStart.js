const mongoose = require("mongoose")
const MongoID = mongoose.Types.ObjectId;
const GameUser = mongoose.model('users');
const IdCounter = mongoose.model("idCounter")
const _ = require("underscore")
const commandAcions = require("../helper/socketFunctions");
const CONST = require("../../constant");
const logger = require("../../logger");
const roundStartActions = require("./roundStart");
const walletActions = require("./updateWallet");
const RouletteTables = mongoose.model('RouletteTables');
const RouletteUserHistory = mongoose.model('RouletteUserHistory');

const gamePlayActionsRoulette = require('./gamePlay');
const adminwinloss = mongoose.model('adminwinloss');


// const leaveTableActions = require("./leaveTable");
const { v4: uuidv4 } = require('uuid');

module.exports.gameTimerStart = async (tb) => {
    try {
        logger.info("gameTimerStart tb : ", tb);
        console.log("game state at start ",tb.gameState);
        if (tb.gameState != "" && tb.gameState != "WinnerDecalre") return false;

        let wh = {
            _id: MongoID(tb._id)
        }
        let update = {
            $set: {
                gameState: "RouletteGameStartTimer",
                "gameTimer.GST": new Date(),
                "totalbet": 0,
                "playerInfo.0.selectObj": [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0,
                    0, 0, 0,
                    0, 0, 0, 0,
                    0, 0
                ],
                "playerInfo.0.betObject": [],
                "playerInfo.0.totalbet": 0,
                "isFinalWinner": false,
                uuid: uuidv4(),
                gameId:uuidv4()
            }
        }
        logger.info("gameTimerStart UserInfo : ", wh, update);

        const tabInfo = await RouletteTables.findOneAndUpdate(wh, update, { new: true });
        logger.info("gameTimerStart tabInfo :: ", tabInfo);

        let roundTime = CONST.BLUETABLETIMER;

        if (tabInfo.whichTable == "blueTable")
            roundTime = CONST.BLUETABLETIMER;
        else
            roundTime = CONST.GREENTABLETIMER;
            
        
        // console.log(tabInfo.history);
        commandAcions.sendEventInTable(tabInfo._id.toString(), CONST.ROULETTE_GAME_START_TIMER, { timer: roundTime, history: tabInfo.history, gameId:tabInfo.gameId });


        // console.log("timmer debugging :- ",roundTime);
         // Add timer countdown in console
         let remainingTime = roundTime;
         const countdownInterval = setInterval(() => {
             remainingTime--;
             var datas = { timer: remainingTime,table:{
                tableId:tabInfo._id.toString(),
                whichTable:tabInfo.whichTable,
                gameId:tabInfo.gameId
             }};
             commandAcions.sendEventInTable(tabInfo._id.toString(),"COUNTDOWN", datas);
             console.log(`Countdown: ${remainingTime} seconds remaining and sending data ${datas.table.gameId}`);
             
             if (remainingTime <= 0) {
                 clearInterval(countdownInterval);
                 console.log("Countdown complete! Starting spinner game...");
             }
         }, 1000);

       
        let tbId = tabInfo._id;
        let jobId = CONST.ROULETTE_GAME_START_TIMER + ":" + tbId;
        let delay = commandAcions.AddTime(roundTime);

        const delayRes = await commandAcions.setDelay(jobId, new Date(delay));

        setTimeout(async () => {
            clearInterval(countdownInterval);
            console.log("Spin...........................");
            this.StartSpinnerGame(tbId)
        }, 1000)



    } catch (error) {
        logger.error("gameTimerStart.js error ->", error)
    }
}

module.exports.StartSpinnerGame = async (tbId) => {

    try {

        const tb = await RouletteTables.findOne({
            _id: MongoID(tbId.toString()),
        }, {})

        logger.info("RouletteGameStartTimer tbId : ", tb);
        if (tb == null || tb.gameState != "RouletteGameStartTimer") return false;


        //Genrate Rendom Number 
        logger.info("RouletteGameStartTimer GAMELOGICCONFIG.SPIN : ", GAMELOGICCONFIG.ROULETTE);
        logger.info("DAY DAY.DAY : ", GAMELOGICCONFIG.DAY);

        logger.info("RouletteGameStartTimer tb.totalbet : ", tb.TableObject);

        // // NORMAL 
        // let itemObject = this.getRandomInt(0, 36)

        // // if(CONST.SORATLOGIC == "Client"){ // Client SIDE
        // //     if(tb.totalbet >= 5){
        // //          Number = this.generateNumber()
        // //     }else if(tb.totalbet < 5){
        // //          Number = this.generateNumber()
        // //     }
        // // }else if(CONST.SORATLOGIC == "User"){  // User SIDE
        // //      Number = this.generateNumber()
        // // }   
        // console.log("itemObject ", itemObject)

        // NORMAL 

        let TotalPlayerBetInfo = []
        let TotalAllPlayer = []

        for (let i = 0; i < tb.playerInfo.length; i++) {
            if (tb.playerInfo[i].betObject != undefined) {
                for (let x = 0; x < tb.playerInfo[i].betObject.length; x++) {

                    if (tb.playerInfo[i].betObject[x] != undefined && tb.playerInfo[i].betObject[x].type == "number") {
                        TotalPlayerBetInfo.push(tb.playerInfo[i].betObject[x])
                    }

                    TotalAllPlayer.push(tb.playerInfo[i].betObject[x])
                }
            }
        }
        let MustPlay = ""
        if (GAMELOGICCONFIG.ROULETTE == "User" && TotalAllPlayer.length <= 5) {
            MustPlay = "Client"
        }

        logger.info("RouletteGameStartTimer MustPlay: ", MustPlay);


        logger.info("RouletteGameStartTimer GAMELOGICCONFIG.SPIN : ", GAMELOGICCONFIG.ROULETTE);

        logger.info("RouletteGameStartTimer MustPlay: ", MustPlay);

        let betObjectData = TotalPlayerBetInfo //tb.playerInfo[0].betObject;
        let itemObject = -1
        let AdminWinlossData = []
        if (GAMELOGICCONFIG.DAY != undefined && GAMELOGICCONFIG.DAY != 1) {
            let datebeforecount = this.AddTimeLAST(-((GAMELOGICCONFIG.DAY - 1) * 86400));

            logger.info("datebeforecount ", datebeforecount)

            //let currentdata = gamePlayActionsRoulette.CreateDate(new Date())


            AdminWinlossData = await adminwinloss.find({ createdAt: { $gte: new Date(datebeforecount) }, win: { $exists: true }, loss: { $exists: true } })
        } else {
            let currentdata = gamePlayActionsRoulette.CreateDate(new Date())
            AdminWinlossData = await adminwinloss.find({ date: currentdata, win: { $exists: true }, loss: { $exists: true } })
        }

        logger.info("AdminWinlossData ", AdminWinlossData)

        let totalWin = (AdminWinlossData.length > 0) ? AdminWinlossData.reduce((total, num) => { return total + Math.round(num.win != undefined ? num.win : 0); }, 0) : 0
        let totalLoss = (AdminWinlossData.length > 0) ? AdminWinlossData.reduce((total, num) => { return total + Math.round(num.loss != undefined ? num.loss : 0); }, 0) : 0
        let perwin = 100 - ((totalLoss * 100) / totalWin)

        logger.info("totalWin", totalWin);
        logger.info("totalLoss", totalLoss);
        logger.info("((totalLoss * 100)/totalWin)", ((totalLoss * 100) / totalWin));
        logger.info("perwin", perwin);
        logger.info("GAMELOGICCONFIG.PERCENTAGE", GAMELOGICCONFIG.PERCENTAGE);


        // GAMELOGICCONFIG.PERCENTAGE = 10 
        // totalWin = 10000;
        // loss = 9450 
        // perwinAdmin = 5.5 //100 - 94.5 // ((9450 * 100) / 10000)
        // 5 < 10 



        if (GAMELOGICCONFIG.PERCENTAGE != undefined && GAMELOGICCONFIG.PERCENTAGE != -1 && perwin < GAMELOGICCONFIG.PERCENTAGE) {
            MustPlay = "Client"
        }

        if (tb.whichTable == "blueTable" && GAMELOGICCONFIG.BLUEFIXNUMBERWON != undefined && GAMELOGICCONFIG.BLUEFIXNUMBERWON != -1 && GAMELOGICCONFIG.BLUEFIXNUMBERWON >= 0 && GAMELOGICCONFIG.BLUEFIXNUMBERWON <= 36) {
            itemObject = GAMELOGICCONFIG.BLUEFIXNUMBERWON
        } else if (tb.whichTable == "greenTable" && GAMELOGICCONFIG.GREENFIXNUMBERWON != undefined && GAMELOGICCONFIG.GREENFIXNUMBERWON != -1 && GAMELOGICCONFIG.GREENFIXNUMBERWON >= 0 && GAMELOGICCONFIG.GREENFIXNUMBERWON <= 36) {
            itemObject = GAMELOGICCONFIG.GREENFIXNUMBERWON
        } else if (MustPlay == "Client" || GAMELOGICCONFIG.ROULETTE == "Client") {
            itemObject = this.getRandomInt(0, 36)
            totalnmber = []
            // Remove TotalNumber for Bet 

            for (let i = 0; i < TotalAllPlayer.length; i++) {
                if (TotalAllPlayer[i].bet != undefined) {
                    totalnmber.push(TotalAllPlayer[i].number)
                }
            }
            totalnmber = _.flatten(totalnmber)

            logger.info("totalnmber ", totalnmber)


            let notselectnumber = _.difference([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], totalnmber)

            logger.info("notselectnumber ", notselectnumber)


            itemObject = notselectnumber.length > 0 ? notselectnumber[this.getRandomInt(0, notselectnumber.length - 1)] : itemObject
        } else if (GAMELOGICCONFIG.ROULETTE == "User") {

            betObjectData.sort((e, f) => {
                return e.bet - f.bet;
            })

            // [2024-05-22T05:35:51.163] [INFO] development - betObjectData [
            //     { number: [ 7 ], type: 'number', bet: 2, betIndex: '7' },
            //     { number: [ 2 ], type: 'number', bet: 100, betIndex: 2 },
            //     { number: [ 3 ], type: 'number', bet: 100, betIndex: 3 },
            //     { number: [ 1 ], type: 'number', bet: 100, betIndex: 1 },
            //     { number: [ 4 ], type: 'number', bet: 100, betIndex: 4 },
            //     { number: [ 5 ], type: 'number', bet: 100, betIndex: 5 },
            //     { number: [ 6 ], type: 'number', bet: 100, betIndex: 6 },
            //     { number: [ 7 ], type: 'number', bet: 500, betIndex: '7' }
            //   ]


            logger.info("betObjectData", betObjectData)

            itemObject = betObjectData.length > 0 && betObjectData[0].number != undefined ? _.flatten(betObjectData[0].number)[0] : this.getRandomInt(0, 36)

        } else {
            itemObject = this.getRandomInt(0, 36)
        }

        let wh = {
            _id: tbId
        }
        let update = {
            $set: {
                gameState: "StartSpinner",
                itemObject: itemObject,
                turnStartTimer: new Date()
            },
            $push: {
                "history": {
                    $each: [itemObject],
                    $slice: -14
                }
            }
        }
        logger.info("startSpinner UserInfo : ", wh, update);

        const tabInfo = await RouletteTables.findOneAndUpdate(wh, update, { new: true });
        logger.info("startSpinner tabInfo :: ", tabInfo);

        commandAcions.sendEventInTable(tabInfo._id.toString(), CONST.START_ROULETTE, { itemObject: itemObject, timelimit: 10 });

        setTimeout(async () => {
            // Clear destory 
            // const tabInfonew = await RouletteTables.findOneAndUpdate(wh, {
            //     $set: {
            //         gameState: "",
            //         itemObject:""
            //     }
            // }, { new: true });
            console.log("winner Spinner...........");
            this.winnerSpinner(tabInfo);
        }, 10000);

        //botLogic.PlayRobot(tabInfo,tabInfo.playerInfo,itemObject)

    } catch (error) {
        logger.error("RouletteTables.js error ->", error)
    }
}

module.exports.AddTimeLAST = (t) => {
    try {
        const ut = new Date();
        ut.setUTCHours(23);
        ut.setUTCMinutes(59);
        ut.setUTCSeconds(0);
        ut.setSeconds(ut.getSeconds() + Number(t));

        ut.setUTCHours(0);
        ut.setUTCMinutes(0);
        ut.setUTCSeconds(0);
        ut.setUTCMilliseconds(0);



        return ut;
    } catch (error) {
        logger.error('socketFunction.js AddTime error :--> ' + error);
    }
};

// Generate a random whole number between a specified range (min and max)
module.exports.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.winnerSpinner = async (tabInfo) => {

    try {
        logger.info("winnerSorat winner ::  -->", tabInfo);
        let tbid = tabInfo._id.toString()
        logger.info("winnerSorat tbid ::", tbid);

        const tb = await RouletteTables.findOne({
            _id: MongoID(tbid.toString()),
        }, {})
        // console.log("winnerSpinner tb ", tb)

        console.log("winnerSpinner tb.itemObject ", tb.itemObject)


        if (typeof tb.itemObject == "undefined" || (typeof tb != "undefined" && tb.playerInfo.length == 0)) {
            logger.info("winnerSpinner winner ::", tb.itemObject);
            logger.info("winnerSpinner winner tb.playerInfo.length ::", tb.playerInfo.length);

            return false;
        }

        if (tabInfo.gameState != "StartSpinner") return false;
        if (tabInfo.isFinalWinner) return false;

        let itemObject = tb.itemObject
        const upWh = {
            _id: tbid
        }
        const updateData = {
            $set: {
                "isFinalWinner": true,
                gameState: "WinnerDecalre",
            }
        };
        logger.info("winnerSorat upWh updateData :: ", upWh, updateData);

        const tbInfo = await RouletteTables.findOneAndUpdate(upWh, updateData, { new: true });
        logger.info("winnerSorat tbInfo : ", tbInfo);

        let winnerData = [

        ]

        let itemIndex = itemObject;

        logger.info("itemIndex", itemIndex);

        console.log("No of users in table :- ",tbInfo.playerInfo.length);

        for (let x = 0; x < tbInfo.playerInfo.length; x++) {
            // console.log("Player Id :-"+ tbInfo.playerInfo[x]._id +" with seat index :- "+tbInfo.playerInfo[x].seatIndex)
            logger.info("tbInfo.playerInfo[x].seatIndex", tbInfo.playerInfo[x].seatIndex);

            logger.info("tbInfo.playerInfo[x].betObject", tbInfo.playerInfo[x].betObject);


            if (tbInfo.playerInfo[x].seatIndex != undefined && tbInfo.playerInfo[x].betObject != undefined) {

                let betObjectData = tbInfo.playerInfo[x].betObject;
                var TotalWinAmount = 0

                
                for (let i = 0; i < betObjectData.length; i++) {
                    if (betObjectData[i].bet != undefined) {

                        console.log("betObjectData[i] ", betObjectData[i])

                        if (betObjectData[i].type == "number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 35,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 35;
                        }

                        if (betObjectData[i].type == "1to34" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }

                        if (betObjectData[i].type == "2to35" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }


                        if (betObjectData[i].type == "3to36" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }

                        if (betObjectData[i].type == "1st12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }

                        if (betObjectData[i].type == "2nd12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }

                        if (betObjectData[i].type == "3rd12" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 3,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 3;
                        }

                        if (betObjectData[i].type == "1to18" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }


                        if (betObjectData[i].type == "19to36" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }

                        if (betObjectData[i].type == "odd" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }

                        if (betObjectData[i].type == "even" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }


                        if (betObjectData[i].type == "red" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }

                        if (betObjectData[i].type == "black" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 2,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 2;
                        }


                        if (betObjectData[i].type == "2_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 17.5,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 17.5;
                        }


                        if (betObjectData[i].type == "3_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 11.66,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 11.66;
                        }

                        if (betObjectData[i].type == "4_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 8.75,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 8.75;
                        }


                        if (betObjectData[i].type == "6_number" && betObjectData[i].number.indexOf(itemIndex) != -1) {
                            winnerData.push({
                                uid: tbInfo.playerInfo[x]._id,
                                seatIndex: 0,
                                winAmount: betObjectData[i].bet * 5.83,
                            })

                            TotalWinAmount = TotalWinAmount + betObjectData[i].bet * 5.83;
                        }


                    }else{
                        console.log("Not having the betObject");
                    }


                }
                console.log("TotalWinAmount ", TotalWinAmount)
                
                let totalRemaningAmount = 0

                const userData = await GameUser.findOne({
                    _id: MongoID(tbInfo.playerInfo[x]._id.toString()),
                }, {chips:1})

                if (TotalWinAmount != 0) {
                    totalRemaningAmount = await walletActions.addWalletAdmin(tbInfo.playerInfo[x]._id, Number(TotalWinAmount), 4, "Roulette Win", "roulette");
                }
                gamePlayActionsRoulette.AdminWinLossData(Number(TotalWinAmount), "loss")

                //console.log("pastbetObject Winner ", betObjectData)
                const upWh = {
                    _id: MongoID(tbid),
                    "playerInfo.seatIndex": tbInfo.playerInfo[x].seatIndex
                }
                const updateData = {
                    $set: {
                        //"playerInfo.$.pastbetObject": betObjectData,
                        "playerInfo.$.betObject": [],
                        "playerInfo.$.totalbet": 0,
                        "playerInfo.$.selectObj": [
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0,
                            0, 0,
                            0, 0, 0,
                            0, 0, 0, 0,
                            0, 0
                        ],
                        "playerInfo.$.uuid": uuidv4(),
                        "playerInfo.$.pasttotalwin":TotalWinAmount
                    }
                };
                logger.info("winnerSorat upWh updateData :: ", upWh, updateData);
                await RouletteTables.findOneAndUpdate(upWh, updateData, { new: true });

                
                // let finddata = await RouletteUserHistory.find({ userId: tbInfo.playerInfo[x]._id.toString(), uuid: tbInfo.uuid })

                // if()
                    
                // let insertobj = {
                //     userId: tbInfo.playerInfo[x]._id.toString(),
                //     ballposition: itemIndex,
                //     beforeplaypoint: tbInfo.playerInfo[x].coins + tbInfo.playerInfo[x].totalbet,
                //     play: tbInfo.playerInfo[x].totalbet,
                //     won: TotalWinAmount,
                //     afterplaypoint: tbInfo.playerInfo[x].coins + TotalWinAmount,
                //     uuid: tbInfo.uuid,
                //     betObjectData: betObjectData

                // };
                //console.log("RouletteUserHistory ", insertobj)
                await RouletteUserHistory.updateOne({ userId: tbInfo.playerInfo[x]._id.toString(), uuid: tbInfo.playerInfo[x].uuid }, {
                    $set: {
                    userId: tbInfo.playerInfo[x]._id.toString(),
                    username: tbInfo.playerInfo[x].name,
                    ballposition: itemIndex,
                    beforeplaypoint: userData.chips+tbInfo.playerInfo[x].totalbet,//tbInfo.playerInfo[x].coins + tbInfo.playerInfo[x].totalbet,
                    play: tbInfo.playerInfo[x].totalbet,
                    won: TotalWinAmount,
                    afterplaypoint: totalRemaningAmount == 0 ? userData.chips : totalRemaningAmount,//tbInfo.playerInfo[x].coins + TotalWinAmount,
                    uuid: tbInfo.playerInfo[x].uuid,
                    betObjectData: betObjectData,
                    createdAt:new Date()
                }}, {upsert:true});
            }
        }
        console.log("updated uuid ",tbInfo.playerInfo[x].uuid);
        console.log("itemIndex ", itemIndex)
        


        const playerInGame = await roundStartActions.getPlayingUserInRound(tbInfo.playerInfo);
        logger.info("getWinner playerInGame ::", playerInGame);


        commandAcions.sendEventInTable(tbInfo._id.toString(), CONST.ROULETTEWINNER, {
            WinnerData: winnerData,
            itemObject: itemObject
        });

        let jobId = CONST.BNW_GAME_START_TIMER + ":" + tbInfo._id.toString();
        let delay = commandAcions.AddTime(5);

        const delayRes = await commandAcions.setDelay(jobId, new Date(delay));

        await this.gameTimerStart(tbInfo);

    } catch (err) {
        logger.info("Exception  WinnerDeclareCall : 1 :: ", err)
    }

}


module.exports.generateRandomNumber = (length) => {
    let randomNumber = '';
    for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
    }
    return randomNumber;
}
