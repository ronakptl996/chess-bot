import logger from "../logger";
import Events from "../eventEmitter";
import global from "../global";
import { IChess, IUpdateBoard } from "../interface";
import { updateValidate } from "../validation/requestValidation";
import { Get, Set } from "../redisOperation";
import { EVENT_NAME, REDIS_KEY } from "../constants";
import { updateRoomValidate } from "../validation/responseValidation";

const updatePieces = async (data: IUpdateBoard, socket: any) => {
  // let lock = await global.lock.acquire([socket.tableId], 12000);

  try {
    console.log("updatePieces DATA TABLE DATA >>", data);
    data = await updateValidate(data);
    if (data) {
      if (socket.tableId) {
        let getData: IChess = await Get(
          `${REDIS_KEY.TABLES}:${socket.tableId}`
        );
        getData.board = data.chessBoard;

        await Set(`${REDIS_KEY.TABLES}:${socket.tableId}`, getData);
        let updatedTable: IChess = await Get(
          `${REDIS_KEY.TABLES}:${socket.tableId}`
        );

        let updateData = {
          eventName: EVENT_NAME.UPDATE_PIECES,
          data: updatedTable,
        };

        updateData = await updateRoomValidate(updateData);

        if (updateData) {
          Events.sendToRoom(socket.tableId.toString(), updateData);
        }
        // await turnTimerDelay(updatedTable);
      }
    } else {
      let errorMessage = "Data not updated!!";

      Events.sendToSocket(socket.id, {
        eventName: EVENT_NAME.ERROR,
        data: { errorMessage },
      });
    }
  } catch (error) {
    logger.error("CATCH_ERROR in updatePieces: ", error);
  } finally {
    // try {
    //   if (lock) {
    //     await lock.release();
    //     // await turnTimerDelay(updatedTable);
    //     logger.info("piece update successfully.");
    //   }
    // } catch (error) {
    //   logger.error("CATCH_ERROR in release lock in updatePieces: ", error);
    // }
  }
};

export default updatePieces;
