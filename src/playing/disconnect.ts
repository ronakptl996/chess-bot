import { REDIS_KEY } from "../constants";
import logger from "../logger";
import { Del, Get, Set } from "../redisOperation";

const disconnect = async (tableId: string) => {
  try {
    let tableData = tableId
      ? await Get(`${REDIS_KEY.TABLES}:${tableId}`)
      : null;
    if (tableData) {
      let QueueData = await Get(`${REDIS_KEY.QUEUE}`);

      console.log(QueueData);

      if (QueueData && QueueData.tableIds.includes(tableData._id)) {
        QueueData.tableIds.splice(QueueData.tableIds.indexOf(tableData._id), 1);
      }
      console.log(QueueData);

      await Set(REDIS_KEY.QUEUE, { tableIds: QueueData.tableIds });

      tableData.playerInfo[0]
        ? await Del(`${REDIS_KEY.PLAYERS}:${tableData.playerInfo[0]._id}`)
        : null;

      tableData.playerInfo[1]
        ? await Del(`${REDIS_KEY.PLAYERS}:${tableData.playerInfo[1]._id}`)
        : null;
      await Del(`${REDIS_KEY.TABLES}:${tableData._id}`);
    }
  } catch (error) {
    logger.error(`CATCH ERROR in disconnect : ${error}`);
  }
};

export default disconnect;
