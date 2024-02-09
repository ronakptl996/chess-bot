import { IChess } from "../interface";
import logger from "../logger";
import {
  possibleBishopkillMove,
  possibleKnightKillMove,
  possiblePawnKillMove,
  possibleQueenKillMove,
  possibleRookKillMove,
} from "./botKillMove";

const botPossibleKillMove = async (tableData: IChess) => {
  const board = tableData.board;

  for (const blackPiece of board) {
    if (blackPiece?.name.includes("BLACK")) {
      if (blackPiece.name.includes("BLACK_PAWN")) {
        const chooseTurnItem = await possiblePawnKillMove(
          blackPiece,
          tableData
        );
        if (chooseTurnItem) {
          logger.error("=========== possiblePawnKillMove ================");
          console.log(chooseTurnItem);
          return chooseTurnItem;
        }
      } else if (blackPiece.name.includes("BLACK_ROOK")) {
        const chooseTurnItem = await possibleRookKillMove(
          blackPiece,
          tableData
        );
        if (chooseTurnItem) {
          logger.error("=========== possibleRookKillMove ================");
          console.log(chooseTurnItem);
          return chooseTurnItem;
        }
      } else if (blackPiece.name.includes("BLACK_KNIGHT")) {
        const chooseTurnItem = await possibleKnightKillMove(
          blackPiece,
          tableData
        );
        if (chooseTurnItem) {
          logger.error("=========== possibleKnightKillMove ================");
          console.log(chooseTurnItem);
          return chooseTurnItem;
        }
      } else if (blackPiece.name.includes("BLACK_BISHOP")) {
        const chooseTurnItem = await possibleBishopkillMove(
          blackPiece,
          tableData
        );
        if (chooseTurnItem) {
          logger.error("=========== possibleBishopkillMove ================");
          console.log(chooseTurnItem);
          return chooseTurnItem;
        }
      } else if (blackPiece.name.includes("BLACK_QUREEN")) {
        const chooseTurnItem = await possibleQueenKillMove(
          blackPiece,
          tableData
        );
        if (chooseTurnItem) {
          logger.error("=========== possibleQueenKillMove ================");
          console.log(chooseTurnItem);
          return chooseTurnItem;
        }
      }
    }
  }
};

export default botPossibleKillMove;
