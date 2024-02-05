import { createClient } from "redis";
import global from "../global";
import IORedis from "ioredis";
import dotenv from "dotenv";
import logger from "../logger";

global.redisClient;
global.redisPub;
global.redisSub;
global.redisData;

dotenv.config({
  path: "./.env",
});

global.redisData = {
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: "",
  database: Number(process.env.REDIS_PUB_SUB_DB),
};

let pubSubHost: string | undefined = process.env.REDIS_PUB_SUB_HOST;
let pubSubPort: string | number | undefined = Number(
  process.env.REDIS_PUB_SUB_PORT
);
let pubSubPassword: string | undefined | null =
  process.env.REDIS_PUB_SUB_PASSWORD;
let pubSubDb: number | undefined = Number(process.env.REDIS_PUB_SUB_DB);

const redisConnection = async () => {
  try {
    const PubSubRedisOptions: any = {
      host: pubSubHost,
      port: pubSubPort,
      password: pubSubPassword,
      db: pubSubDb,
    };

    global.redisPub = new IORedis(PubSubRedisOptions);
    global.redisSub = new IORedis(PubSubRedisOptions);

    global.redisClient = createClient(global.redisData);
    global.redisClient.connect();
    global.redisClient.on("ready", () => {
      logger.info(" >> Redis Connected!");
      global.redisClient.flushDb();
    });

    global.redisClient.on("error", (error: any) => {
      logger.info(` >> Redis  ${error}`);
    });

    global.redisPub.on("ready", () => {
      logger.info(` >> pub server connected successfully..`);
    });

    global.redisPub.on("error", (error: any) => {
      logger.info(`Redis Pub ${error}`);
    });

    global.redisSub.on("ready", () => {
      logger.info(` >> Sub server connected successfully..`);
    });

    global.redisSub.on("error", (error: any) => {
      logger.info(` >> Redis Sub ${error}`);
    });
  } catch (error) {
    logger.error("CATCH ERROR in redisConnection:", error);
  }
};

export default redisConnection;
