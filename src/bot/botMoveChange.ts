import { EVENT_NAME, REDIS_KEY } from "../constants";
import { IChess } from "../interface";
import { Set } from "../redisOperation";
import Events from "../eventEmitter";

const botMoveChange = async (tableData: IChess) => {
  console.log("botMoveChange ::", tableData);

  await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);

  //   let turnMessage =
  //     tableData.pieceColor == "black"
  //       ? `${tableData.playerInfo[0].playername} Turn`
  //       : `${tableData.playerInfo[1].playername} Turn`;

  let moveData = {
    eventName: EVENT_NAME.BOT_MOVE_PIECES,
    data: { tableData },
  };
  Events.sendToRoom(tableData._id, moveData);

  let turnMessage =
    tableData.pieceColor == "black"
      ? `${tableData.playerInfo[0].playername} Turn`
      : `${tableData.playerInfo[1].playername} Turn`;

  tableData.currentTurn = tableData.playerInfo[0]._id
    ? tableData.playerInfo[0]._id
    : tableData.playerInfo[1]._id;

  tableData.pieceColor =
    tableData.pieceColor == "black"
      ? tableData.playerInfo[0].pieceColor
      : tableData.playerInfo[1].pieceColor;

  await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);

  const updatedData = {
    eventName: EVENT_NAME.BOT_UPDATE_PIECES,
    data: {
      turnMessage,
      currentTurn: tableData.currentTurn,
    },
  };

  Events.sendToRoom(tableData._id, updatedData);
};

export default botMoveChange;
