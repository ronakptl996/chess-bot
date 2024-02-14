import { turnTimer, turnTimerDelay } from "../bull/queue/turnDelayTimer";
import { REDIS_KEY } from "../constants";
import { IChess } from "../interface";
import logger from "../logger";
import { Get } from "../redisOperation";
import botPossibleMove from "./botPossibleMove";

const botTurn = async (tableId: string) => {
  logger.error("========================BOT TURN-======================");
  const tableData: IChess = await Get(`${REDIS_KEY.TABLES}:${tableId}`);

  console.log("BOT TABLE DATA >>", tableData);

  logger.info("===================BOT TIMER DELAY START");
  // await turnTimerDelay({
  //   data: {
  //     nextTurn: tableData.currentTurn,
  //   },
  //   tableId,
  // });

  // Random Move
  await botPossibleMove(tableData);
};

export default botTurn;
