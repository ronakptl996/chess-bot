import { EVENT_NAME, REDIS_KEY, TABLE_STATE } from "../constants";
import { ILeaveTable, IUser, IChess } from "../interface";
import { Del, Get, Set } from "../redisOperation";
import Event from "../eventEmitter";
import logger from "../logger";
import { disconnect } from "./";
import { lockInGameStateTimer } from "../bull/queue/lockInGameStateQueue";
import { startGameTimer } from "../bull/queue/startGameQueue";
import tableState from "../constants/tableState";

const leaveTable = async (data: ILeaveTable, socket: any) => {
  if (data.tableId == socket.tableId) {
    try {
      let tableData: IChess = await Get(
        `${REDIS_KEY.TABLES}:${socket.tableId}`
      );

      if (tableData) {
        let winData;
        if (tableData.playerInfo.length === 1) {
          winData = {
            eventName: EVENT_NAME.LEAVE_TABLE,
            data: {
              message: "You left the table",
            },
          };
          Event.sendToSocket(socket.id, winData);
          disconnect(socket.tableId);
        } else {
          logger.error("================== leaveTable win");
          const lockInJob = await lockInGameStateTimer.getJob(data.tableId);

          if (lockInJob) {
            const startGameJob = await startGameTimer.getJob(data.tableId);

            await lockInJob.remove();
            await startGameJob?.remove();

            tableData.currentTurn =
              tableData.playerInfo[0]._id == data.userId
                ? tableData.playerInfo[1]._id
                : tableData.playerInfo[0]._id;

            tableData.playerInfo = tableData.playerInfo.filter(
              (player: IUser) => player._id != data.userId
            );

            tableData.playerInfo[0].pieceColor = "white";

            tableData.status = tableState.WAITING_FOR_PLAYER;

            tableData.activePlayer = 1;

            const leaveBeforeLockInData = {
              eventName: EVENT_NAME.LEAVE_USER_BEFORE_LOCK_IN,
              data: tableData,
            };

            await Del(`${REDIS_KEY.PLAYERS}:${data.userId}`);
            await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);

            Event.sendToRoom(tableData._id, leaveBeforeLockInData);
            return;
          } else {
            winData = {
              eventName: EVENT_NAME.WIN,
              data: {
                winnerId:
                  tableData.playerInfo[0]._id == data.userId
                    ? tableData.playerInfo[1]._id
                    : tableData.playerInfo[0]._id,
              },
            };
            tableData.status = TABLE_STATE.GAME_WIN;
            Event.sendToRoom(tableData._id, winData);
            await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);
            disconnect(socket.tableId);
          }
        }
        // disconnect(socket.tableId);
      }
    } catch (error) {
      logger.error(`Catch Error in LeaveTable: ${error}`);
    }
  }
};

export default leaveTable;
