import { IBoardObject, IChess } from "../../interface";
import { makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackPawnMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  if (chooseTurnItem.isFirstMove) {
    let firstTurnMovePawn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    console.log("firstTurnMovePawn >>", firstTurnMovePawn);
    if (firstTurnMovePawn == 1) {
      if (
        board[Number(chooseTurnItem.id) + 7] &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 7);
        botMoveChange(tableData);
        return;
      } else if (
        board[Number(chooseTurnItem.id) + 9] &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 9);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 8] === null) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
        return;
      }
    } else {
      if (
        board[Number(chooseTurnItem.id) + 7] &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 7);
        botMoveChange(tableData);
        return;
      } else if (
        board[Number(chooseTurnItem.id) + 9] &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 9);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 16] === null) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 16);
        botMoveChange(tableData);
        return;
      } else if (board[Number(chooseTurnItem.id) + 8] === null) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 16);
        botMoveChange(tableData);
        return;
      }
    }
  } else {
    if (
      board[Number(chooseTurnItem.id) + 7] &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
      botMoveChange(tableData);
      return;
    } else if (
      board[Number(chooseTurnItem.id) + 9] &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 9);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 8] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 8);
      botMoveChange(tableData);
    }
  }
};

export default botBlackPawnMove;
