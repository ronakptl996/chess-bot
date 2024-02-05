import express from "express";
import global from "./global";
import { Server as socketIoServer } from "socket.io";
import { Server, createServer } from "http";
import dotenv from "dotenv";
import path from "path";
import logger from "./logger";
import redisConnection from "./connection/redisConnection";
import socketConnection from "./connection/socketConnection";
import redLockConnection from "./connection/redLockConnection";

const app = express();
const server: Server = createServer(app);

global.io = new socketIoServer(server, {
  cors: { origin: "*" },
  transports: ["polling", "websocket"],
  pingInterval: 25000,
  pingTimeout: 20000,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

dotenv.config({
  path: "./.env",
});

redisConnection();
socketConnection();
redLockConnection();

const PORT: String | Number = process.env.SERVER_PORT || 3200;

server.listen(PORT, () => {
  logger.info(` >> Express server started at http://localhost:${PORT}`);
});
