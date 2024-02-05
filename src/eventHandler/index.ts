import logger from "../logger";
import { EVENT_NAME } from "../constants";
import {
  joinTable,
  movePieces,
  updatePieces,
  leaveTable,
  winUser,
} from "../playing";

const handleEvent = (socket: any) => {
  socket.onAny((eventName: string, data: any) => {
    logger.info(
      `REQUEST EVENT NAME: ${eventName}, REQUEST DATA: ${JSON.stringify(
        data.data
      )} socket :: ${socket.id}`
    );

    switch (eventName) {
      case EVENT_NAME.JOIN:
        joinTable(data.data, socket);
        break;
      case EVENT_NAME.MOVE_PIECES:
        movePieces(data.data, socket);
        break;
      case EVENT_NAME.UPDATE_PIECES:
        updatePieces(data.data, socket);
        break;
      case EVENT_NAME.LEAVE_TABLE:
        leaveTable(data.data, socket);
        break;
      case EVENT_NAME.WIN:
        winUser(data.data, socket);
    }
  });
};

export default handleEvent;
