import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackKnightMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "===========================botBlackKnightMove=========================="
  );

  const board = tableData.board;

  // FOR CORNER NUMBER ID
  if (cornerNumber.includes(Number(chooseTurnItem.id))) {
    // FOR INDEX 0 to 7
    if (Number(chooseTurnItem.id) >= 0 && Number(chooseTurnItem.id) <= 7) {
      // FOR 0
      if (Number(chooseTurnItem.id) == 0) {
        // TO UPWARD
        if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 10] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 17] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        }
      }

      // FOR 7
      else if (Number(chooseTurnItem.id) == 7) {
        // TO UPWARD
        if (board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 6);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 6] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 6);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 15] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        }
      }

      // For 1
      else if (Number(chooseTurnItem.id) == 1) {
        // TO UPWARD
        if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 10] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 15] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 17] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        }
      }

      // For 2 to 6
      else {
        // TO UPWARD
        if (
          Number(chooseTurnItem.id) != 6 &&
          board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 6);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        } else if (
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        } else if (
          Number(chooseTurnItem.id) != 6 &&
          board[Number(chooseTurnItem.id) + 10] == null
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 10);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 6] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 6);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 15] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 15);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 17] == null) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 17);
          botMoveChange(tableData);
        }
      }
    }

    // FOR ID % 2 == 0
    else if (Number(chooseTurnItem.id) % 2 == 0) {
      if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 10);
        botMoveChange(tableData);
      } else if (
        board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 17);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -6);
        botMoveChange(tableData);
      } else if (
        board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -15);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 10] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 10);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 17] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 17);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) - 6] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -6);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) - 15] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -15);
        botMoveChange(tableData);
      }
    }

    // FOR ID % 2 != 0
    else if (Number(chooseTurnItem.id) % 2 != 0) {
      if (board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -17);
        botMoveChange(tableData);
      } else if (
        board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -10);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 6);
        botMoveChange(tableData);
      } else if (
        board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 15);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 6] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 6);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 15] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 15);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) - 17] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -17);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) - 10] == null) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -10);
        botMoveChange(tableData);
      }
    }
  }
  // WITHOUT CORNER NUMBER ID
  else {
    if (board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -10);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -15);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -17);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 10);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 15);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 17);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 10] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 10);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 15] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 15);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 17] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 17);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 10] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -10);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 15] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -15);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 17] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -17);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -6);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 6);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) - 6] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -6);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 6] == null) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 6);
      botMoveChange(tableData);
    }
  }
};

export default botBlackKnightMove;
