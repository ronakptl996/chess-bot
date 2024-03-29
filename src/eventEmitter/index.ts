import global from "../global";
import logger from "../logger";

class Event {
  sendToSocket(socketId: string, data: any) {
    logger.info(
      `sendToSocket : RESPONSE EVENT NAME : ${
        data.eventName
      } : RESPONSE DATA : ${JSON.stringify(data.data)}`
    );
    global.io.to(socketId).emit(data.eventName, data);
  }
  sendToRoom(tableId: string, data: any) {
    logger.info(
      `sendToRoom : RESPONSE EVENT NAME : ${
        data.eventName
      } : RESPONSE DATA : ${JSON.stringify(data.data)}`
    );
    global.io.to(tableId).emit(data.eventName, data);
  }
}

export default new Event();
