import { EVENT_NAME } from "../constants";
import { IChess } from "../interface";
import logger from "../logger";
import { makeBotBoard } from "../utils";
import botMoveChange from "./botMoveChange";
import botPossibleKillMove from "./botPossibleKillMove";
import isBotMoveValid from "./isBotMoveValid";
import Events from "../eventEmitter";
import { disconnect } from "../playing";
import {
  botBlackBishopMove,
  botBlackKnightMove,
  botBlackQueenMove,
  botBlackRookMove,
  botBlackKingMove,
  botBlackPawnMove,
} from "./moveForBot";
import kingCheckmate from "./kingCheckmate";
import botCheckMateMoveForKing from "./botCheckMateMoveForKing";

const botPossibleMove = async (tableData: IChess) => {
  try {
    const board = tableData.board;

    const checkForKing = await kingCheckmate(board);
    if (checkForKing) {
      logger.error("=================== checkForKing =======================");
      console.log(checkForKing);

      if (checkForKing.kill) {
        tableData.board = makeBotBoard(
          board,
          checkForKing.chooseTurnItemId,
          checkForKing.move,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else {
        const move = botCheckMateMoveForKing(tableData, checkForKing);
        logger.info(
          "=========================== CHECK MATE MOVE ==============================="
        );
        console.log(move);
        if (move) {
          tableData.board = makeBotBoard(
            board,
            checkForKing.chooseTurnItemId,
            move.move,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      }
    }

    const killPiece = await botPossibleKillMove(tableData);

    if (killPiece != undefined) {
      logger.error("==============botPossibleKillMove===========");
      console.log(killPiece);

      console.log(board[killPiece.move]);

      tableData.board = makeBotBoard(
        board,
        killPiece.chooseTurnItemId,
        killPiece.move,
        tableData._id
      );
      botMoveChange(tableData);
      return;
    } else {
      let randomBotTurn: Number;
      let chooseTurnItem: any;

      do {
        randomBotTurn = Math.floor(Math.random() * (63 - 0 + 1)) + 0;
        console.log("randomBotTurn >>", randomBotTurn);

        chooseTurnItem = board.find((item) => {
          return item?.id === randomBotTurn && item.name.includes("BLACK");
        });
      } while (!chooseTurnItem || !isBotMoveValid(board, chooseTurnItem));

      console.log("======????????", chooseTurnItem);

      if (chooseTurnItem.name.includes("BLACK_PAWN")) {
        await botBlackPawnMove(chooseTurnItem, tableData);
      } else if (chooseTurnItem.name.includes("BLACK_ROOK")) {
        await botBlackRookMove(chooseTurnItem, tableData);
      } else if (chooseTurnItem.name.includes("BLACK_KNIGHT")) {
        await botBlackKnightMove(chooseTurnItem, tableData);
      } else if (chooseTurnItem.name.includes("BLACK_BISHOP")) {
        await botBlackBishopMove(chooseTurnItem, tableData);
      } else if (chooseTurnItem.name.includes("BLACK_QUREEN")) {
        await botBlackQueenMove(chooseTurnItem, tableData);
      } else if (chooseTurnItem.name.includes("BLACK_KING")) {
        await botBlackKingMove(chooseTurnItem, tableData);
      }
    }
  } catch (error) {
    logger.error("ERROR in botPossibleMove: ", error);
  }
};

export default botPossibleMove;
