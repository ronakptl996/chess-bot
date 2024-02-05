import { EVENT_NAME, REDIS_KEY } from "../constants";
import { IWinData } from "../interface";
import logger from "../logger";
import { Get } from "../redisOperation";
import Event from "../eventEmitter";
import disconnect from "./disconnect";

const winUser = async (data: IWinData, socket: any) => {
  try {
    if (data.tableId == socket.tableId) {
      const tableData = await Get(`${REDIS_KEY.TABLES}:${data.tableId}`);
      if (tableData) {
        let users = tableData.playerInfo;
        let winUser = users.filter(
          (user: any) => user.pieceColor === data.pieceColor
        );
        logger.error("================== WINUSER win");
        console.log("winUser >>", winUser);
        let winData = {
          eventName: EVENT_NAME.WIN,
          data: {
            winnerId: winUser[0]._id,
          },
        };

        Event.sendToRoom(tableData._id, winData);
        disconnect(tableData._id);
      }
    }
  } catch (error) {
    logger.error("Catch Error in winUser ", error);
  }
};

export default winUser;
