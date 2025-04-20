const { findDisconnectTable } = require(".");
const CONST = require("../../constant");
const RouletteTables = require("../models/RouletteTables");
const commandAcions = require("../helper/socketFunctions");

const mongoose = require('mongoose');
const MongoID = mongoose.Types.ObjectId;


const gameReJoinRoulette = async (payload) => {
    try {
        console.log("data reconnect... ", payload);

        let wh = {
            _id: MongoID(payload.tableId)
        }
        const tabInfo = await RouletteTables.findOne(wh);

        // console.log(tabInfo);

        let roundTime = CONST.BLUETABLETIMER;

        if (tabInfo.whichTable == "blueTable")
            roundTime = CONST.BLUETABLETIMER;
        else
            roundTime = CONST.GREENTABLETIMER;


        // console.log("here is the data sending ",{ timer: roundTime, history: tabInfo.history, gameId: tabInfo.gameId })

        commandAcions.sendEventInTable(tabInfo._id.toString(), CONST.ROULETTE_GAME_START_TIMER, { timer: roundTime, history: tabInfo.history, gameId: tabInfo.gameId });



    } catch (error) {
        console.log("error gameReJoinRoulette", error);
        // logger.error('socketServer.js SEND_MESSAGE_TO_TABLE => ', error);
    }
};

const gameReJoinRouletteUserChecks = async (payload,client) => {
    try {
        console.log("data reconnect... ", payload);


        let gwh1 = {
                    "playerInfo._id": MongoID(payload.playerId)
                }
        let tableInfo = await RouletteTables.findOne(gwh1, { "playerInfo.$": 1 }).lean();
                
        if (tableInfo) {
            if (tableInfo.playerInfo && tableInfo.playerInfo.length > 0) {
                let player = tableInfo.playerInfo[0];
            
                if (player.uuid !== payload.uuid) {
                    // Player trying to join an active session with different uuid
                    commandAcions.sendEvent(client, CONST.ROULETTE_GAME_PLAYGAME, {
                        error: 1,
                        message: "Session mismatch. Try rejoining properly.",
                    });
                    return;
                }
            }
            if(isUsersBets(tableInfo.playerInfo,payload.playerId)){
                commandAcions.sendEvent(client, CONST.ROULETTE_GAME_PLAYGAME, {
                    isAbleToJoin:0,
                    whichTable:payload.whichTable
                });
            }else{
                commandAcions.sendEvent(client, CONST.ROULETTE_GAME_PLAYGAME, {
                    isAbleToJoin:1,
                    whichTable:payload.whichTable
                });
            }
        }else{
            commandAcions.sendEvent(client, CONST.ROULETTE_GAME_PLAYGAME, {
                isAbleToJoin:1,
                whichTable:payload.whichTable
            });
        }
        

        
    } catch (error) {
        console.log("catch error");
        commandAcions.sendEvent(client, CONST.ROULETTE_GAME_PLAYGAME, {
            error:1,
        });
        console.log("error gameReJoinRoulette", error);
        // logger.error('socketServer.js SEND_MESSAGE_TO_TABLE => ', error);
    }
};
const isUsersBets = (playerInfo,playerId)=>{
    console.log("length ",playerInfo.length);
    for(var i=0;i<playerInfo.length;i++){
        // console.log(playerInfo[i]);
        if(playerInfo[i].playerId == playerId){
            console.log(playerInfo[i]);
            console.log("Checkng users bets ",playerInfo[i].betObject.length);
            if(playerInfo[i].betObject.length>0){
                return true;
            }else{
                return false;
            }
            
        }
    }
    return false;
}
module.exports = { gameReJoinRoulette,gameReJoinRouletteUserChecks };