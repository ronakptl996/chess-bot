import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, currentLine, makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackKnightMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "===========================botBlackKnightMove=========================="
  );

  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR KILL WHITE 15 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 15 <= 63 &&
    Number(chooseTurnItem.id) + 15 > currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 15, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE 6 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 6 <= 63 &&
    Number(chooseTurnItem.id) + 6 > currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 6, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE 10 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 10 <= 63 &&
    Number(chooseTurnItem.id) + 10 <= currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 10, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE 17 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 17 <= 63 &&
    Number(chooseTurnItem.id) + 17 <= currentLineBetween[1] + 16 &&
    board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 17, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE -15 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 15 >= 0 &&
    Number(chooseTurnItem.id) - 15 < currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -15, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE -6 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 6 >= 0 &&
    Number(chooseTurnItem.id) - 6 < currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -6, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE -10 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 10 >= 0 &&
    Number(chooseTurnItem.id) - 10 >= currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -10, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE -17 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 17 >= 0 &&
    Number(chooseTurnItem.id) - 17 >= currentLineBetween[0] - 16 &&
    board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -17, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR 15 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 15 <= 63 &&
    Number(chooseTurnItem.id) + 15 > currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 15] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 15, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR 6 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 6 <= 63 &&
    Number(chooseTurnItem.id) + 6 > currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 6] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 6, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE 10 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 10 <= 63 &&
    Number(chooseTurnItem.id) + 10 <= currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 10] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 10, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE 17 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 17 <= 63 &&
    Number(chooseTurnItem.id) + 17 <= currentLineBetween[1] + 16 &&
    board[Number(chooseTurnItem.id) + 17] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 17, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -15 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 15 >= 0 &&
    Number(chooseTurnItem.id) - 15 < currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 15] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -15, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -6 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 6 >= 0 &&
    Number(chooseTurnItem.id) - 6 < currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 6] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -6, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -10 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 10 >= 0 &&
    Number(chooseTurnItem.id) - 10 >= currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 10] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -10, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -17 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 17 >= 0 &&
    Number(chooseTurnItem.id) - 17 >= currentLineBetween[0] - 16 &&
    board[Number(chooseTurnItem.id) - 17] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -17, tableData._id);
    botMoveChange(tableData);
    return;
  }
};

export default botBlackKnightMove;
