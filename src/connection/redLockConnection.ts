import Redlock from "redlock";
import dotenv from "dotenv";
import { createClient } from "redis";
import IORedis from "ioredis";
import global from "../global";
import logger from "../logger";

dotenv.config({
  path: "./.env",
});

let pubSubHost: string | undefined = process.env.REDIS_PUB_SUB_HOST;
let pubSubPort: string | number | undefined = process.env.REDIS_PUB_SUB_PORT;
let pubSubPassword: string | undefined | null =
  process.env.REDIS_PUB_SUB_PASSWORD;
let pubSubDb: string | undefined = process.env.REDIS_PUB_SUB_DB;

const redLockConnection = async () => {
  try {
    const redLockClient = createClient(global.redisData);
    redLockClient.connect();
    redLockClient.on("connect", () => {
      logger.info(" >> redLock connected successfully...");
    });

    redLockClient.on("error", (error: any) => {
      logger.error(` >> redLock connection error ${error}`);
    });

    const redlockOptions: any = {
      host: pubSubHost,
      port: pubSubPort,
      password: pubSubPassword,
      db: pubSubDb,
    };

    let redisIOConnection = new IORedis(redlockOptions);
    global.lock = new Redlock([redisIOConnection], {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 20,
      retryJitter: 20,
    });
  } catch (error: any) {
    logger.error(`CATCH ERROR in redisConnection: ${error}`);
  }
};

export default redLockConnection;
