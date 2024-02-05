import { createAdapter } from "socket.io-redis";
import global from "../global";
import logger from "../logger";
import eventHandle from "../eventHandler";
import { leaveUserGameQueue } from "../bull/queue/leaveUserGameQueue";
import { Get } from "../redisOperation";
import { REDIS_KEY } from "../constants";

const socketIoConnection = () => {
  try {
    global.io.adapter(createAdapter(global.redisPub, global.redisSub));
    global.io.on("connection", async (socket: any) => {
      logger.info(` >> ${socket.id} connected....`);
      eventHandle(socket);
      socket.on("disconnect", async () => {
        logger.warn(` >> ${socket.id} disconnected!`);
        logger.error(` >> ${socket.tableId} table, ${socket.userId} userId`);
        if (socket.userId && socket.tableId) {
          console.log("LEFT USER+++++++++++++++++");
          const tableData = await Get(`${REDIS_KEY.TABLES}:${socket.tableId}`);

          if (tableData && tableData.playerInfo.length == 2) {
            await leaveUserGameQueue({
              tableId: socket.tableId,
              userId: socket.userId,
            });
          }
        }
      });
    });
  } catch (error: any) {
    logger.error("CATCH ERROR in socketConnection:", error);
  }
};

export default socketIoConnection;
