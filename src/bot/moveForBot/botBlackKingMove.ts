import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, makeBotBoard, currentLine } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackKingMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error("===================botBlackKingMove===================");

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) < arr[1]
  );

  const board = tableData.board;

  // FOR KILL WHITE TO +1 AND -1 MOVE
  if (currentLineBetween) {
    // KILL +1 MOVE
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 1, tableData._id);
      botMoveChange(tableData);
      return;
    }

    // KILL -1 MOVE
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -1, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR KILL +7
  if (
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL -7
  if (
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL +8
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL -8
  if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -8, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL +9
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL -9
  if (
    Number(chooseTurnItem.id) - 9 >= 63 &&
    board[Number(chooseTurnItem.id) - 9]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -9, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +1 AND -1 MOVE
  if (currentLineBetween) {
    // +1 MOVE
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 1, tableData._id);
      botMoveChange(tableData);
      return;
    }

    // -1 MOVE
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -1, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR +7 MOVE
  if (
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +8 MOVE
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +9 MOVE
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
    botMoveChange(tableData);
    return;
  }
};

export default botBlackKingMove;
