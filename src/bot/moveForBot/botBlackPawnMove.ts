import { IBoardObject, IChess } from "../../interface";
import { currentLine, makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackPawnMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  if (chooseTurnItem.isFirstMove) {
    let firstTurnMovePawn = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    console.log("firstTurnMovePawn >>", firstTurnMovePawn);
    if (firstTurnMovePawn == 1) {
      if (
        board[Number(chooseTurnItem.id) + 7] &&
        currentLineBetween &&
        Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
        botMoveChange(tableData);
        return;
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
        board[Number(chooseTurnItem.id) + 9] &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
        botMoveChange(tableData);
      } else if (
        Number(chooseTurnItem.id) + 8 <= 63 &&
        board[Number(chooseTurnItem.id) + 8] === null
      ) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
        botMoveChange(tableData);
        return;
      }
    } else {
      if (
        board[Number(chooseTurnItem.id) + 7] &&
        currentLineBetween &&
        Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
        botMoveChange(tableData);
        return;
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
        board[Number(chooseTurnItem.id) + 9] &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 16] === null) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          16,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (board[Number(chooseTurnItem.id) + 8] === null) {
        chooseTurnItem.isFirstMove = false;
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          16,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    }
  } else {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 7] &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
      botMoveChange(tableData);
      return;
    } else if (
      board[Number(chooseTurnItem.id) + 9] &&
      currentLineBetween &&
      Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
      botMoveChange(tableData);
    } else if (
      Number(chooseTurnItem.id) + 8 <= 63 &&
      board[Number(chooseTurnItem.id) + 8] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
      botMoveChange(tableData);
    }
  }
};

export default botBlackPawnMove;
