import { IChess } from "../interface";
import logger from "../logger";
import botMoveChange from "./botMoveChange";
import isBotMoveValid from "./isBotMoveValid";
import {
  botBlackBishopMove,
  botBlackKnightMove,
  botBlackQueenMove,
  botBlackRookMove,
} from "./moveForBot";
import botBlackKingMove from "./moveForBot/botBlackKingMove";

const botPossibleMove = async (tableData: IChess) => {
  // try {
  //   const board = tableData.board;
  //   let randomBotTurn = Math.floor(Math.random() * (63 - 0 + 1)) + 0;
  //   console.log("randomBotTurn >>", randomBotTurn);

  //   let chooseTurnItem = board.forEach((item) => {
  //     if (item?.id == randomBotTurn && item.name.includes("BLACK")) {
  //       console.log("======????????", item);

  //       if (item.name.includes("BLACK_PAWN")) {
  //         if (item.isFirstMove) {
  //           let firstTurnMovePawn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  //           console.log("firstTurnMovePawn >>", firstTurnMovePawn);
  //           if (firstTurnMovePawn == 1) {
  //             if (board[Number(item?.id) + 8] === null) {
  //               item.isFirstMove = false;
  //               board[Number(item.id)] = null;
  //               board[Number(item.id) + 8] = {
  //                 id: Number(item.id) + 8,
  //                 name: item.name,
  //                 isFirstMove: item.isFirstMove,
  //               };
  //               botMoveChange(tableData);
  //               return;
  //             }
  //           } else {
  //             if (board[Number(item?.id) + 16] === null) {
  //               item.isFirstMove = false;
  //               board[Number(item.id)] = null;
  //               board[Number(item.id) + 16] = {
  //                 id: Number(item.id) + 16,
  //                 name: item.name,
  //                 isFirstMove: item.isFirstMove,
  //               };
  //               botMoveChange(tableData);
  //               return;
  //             }
  //           }
  //           // console.log(tableData);
  //         }
  //       }
  //     }
  //   });
  // } catch (error) {
  //   logger.error("ERROR in botPossibleMove: ", error);
  // }
  try {
    const board = tableData.board;

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
      if (chooseTurnItem.isFirstMove) {
        let firstTurnMovePawn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        console.log("firstTurnMovePawn >>", firstTurnMovePawn);
        if (firstTurnMovePawn == 1) {
          if (board[chooseTurnItem.id + 8] === null) {
            chooseTurnItem.isFirstMove = false;
            board[chooseTurnItem.id] = null;
            board[chooseTurnItem.id + 8] = {
              id: chooseTurnItem.id + 8,
              name: chooseTurnItem.name,
              isFirstMove: chooseTurnItem.isFirstMove,
            };
            botMoveChange(tableData);
          } else if (board[chooseTurnItem.id + 8]?.name.includes("WHITE")) {
            chooseTurnItem.isFirstMove = false;
            board[chooseTurnItem.id] = null;
            board[chooseTurnItem.id + 8] = {
              id: chooseTurnItem.id + 8,
              name: chooseTurnItem.name,
              isFirstMove: chooseTurnItem.isFirstMove,
            };
            botMoveChange(tableData);
          }
        } else {
          if (board[chooseTurnItem.id + 16] === null) {
            chooseTurnItem.isFirstMove = false;
            board[chooseTurnItem.id] = null;
            board[chooseTurnItem.id + 16] = {
              id: chooseTurnItem.id + 16,
              name: chooseTurnItem.name,
              isFirstMove: chooseTurnItem.isFirstMove,
            };
            botMoveChange(tableData);
          } else if (board[chooseTurnItem.id + 16]?.name.includes("WHITE")) {
            chooseTurnItem.isFirstMove = false;
            board[chooseTurnItem.id] = null;
            board[chooseTurnItem.id + 16] = {
              id: chooseTurnItem.id + 16,
              name: chooseTurnItem.name,
              isFirstMove: chooseTurnItem.isFirstMove,
            };
            botMoveChange(tableData);
          }
        }
      } else {
        if (
          board[chooseTurnItem.id + 7] &&
          board[chooseTurnItem.id + 7]?.name.includes("WHITE")
        ) {
          board[chooseTurnItem.id] = null;
          board[chooseTurnItem.id + 7] = null;
          board[chooseTurnItem.id + 7] = {
            id: chooseTurnItem.id + 7,
            name: chooseTurnItem.name,
            isFirstMove: chooseTurnItem.isFirstMove,
          };
          botMoveChange(tableData);
        } else if (
          board[chooseTurnItem.id + 9] &&
          board[chooseTurnItem.id + 9]?.name.includes("WHITE")
        ) {
          board[chooseTurnItem.id] = null;
          board[chooseTurnItem.id + 9] = null;
          board[chooseTurnItem.id + 9] = {
            id: chooseTurnItem.id + 9,
            name: chooseTurnItem.name,
            isFirstMove: chooseTurnItem.isFirstMove,
          };
          botMoveChange(tableData);
        } else if (
          board[chooseTurnItem.id + 8]?.name.includes("WHITE") ||
          board[chooseTurnItem.id + 8] == null
        ) {
          board[chooseTurnItem.id] = null;
          board[chooseTurnItem.id + 8] = null;
          board[chooseTurnItem.id + 8] = {
            id: chooseTurnItem.id + 8,
            name: chooseTurnItem.name,
            isFirstMove: chooseTurnItem.isFirstMove,
          };
          botMoveChange(tableData);
        }
      }
    }

    if (chooseTurnItem.name.includes("BLACK_ROOK")) {
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
  } catch (error) {
    logger.error("ERROR in botPossibleMove: ", error);
  }
};

export default botPossibleMove;
