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

const botPossibleMove = async (tableData: IChess) => {
  try {
    const board = tableData.board;
    const killPiece = await botPossibleKillMove(tableData);
    console.log(
      " >>  -----   chooseTurnItemNumber--------- <<<<<<<<",
      killPiece
    );

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
