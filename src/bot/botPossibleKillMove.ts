import { IChess } from "../interface";
import logger from "../logger";
import {
  possibleKnightKillMove,
  possiblePawnKillMove,
  possibleRookKillMove,
} from "./botKillMove";

const botPossibleKillMove = async (tableData: IChess) => {
  const board = tableData.board;
  //   board.forEach(async (blackPiece) => {
  //     if (blackPiece?.name.includes("BLACK")) {
  //       if (blackPiece.name.includes("BLACK_PAWN")) {
  //         const chooseTurnItem = await possiblePawnKillMove(
  //           blackPiece,
  //           tableData
  //         );
  //         if (chooseTurnItem) {
  //           logger.error(
  //             "?????????????????????=========== possiblePawnKillMove ================??????????"
  //           );
  //           console.log(chooseTurnItem);

  //           return chooseTurnItem;
  //         }
  //       }
  //     }
  //   });

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
      }
      // else if(blackPiece.name.includes("BLACK_BISHOP")){

      // }
    }
  }
};

export default botPossibleKillMove;
