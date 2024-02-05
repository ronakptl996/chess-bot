import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackBishopMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "====================botBlackBishopMove==========================="
  );

  const board = tableData.board;

  // FOR INDEX 0 to 7
  // FOR 0
  if (Number(chooseTurnItem.id) == 0) {
    // TO UPWARD
    if (board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 9);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 9] == null) {
      if (board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 18);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 18] == null) {
        if (board[Number(chooseTurnItem.id) + 27]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 27);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 27] == null) {
          if (board[Number(chooseTurnItem.id) + 36]?.name.includes("WHITE")) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 36);
            botMoveChange(tableData);
          } else if (board[Number(chooseTurnItem.id) + 36] == null) {
            if (board[Number(chooseTurnItem.id) + 45]?.name.includes("WHITE")) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 45);
              botMoveChange(tableData);
            } else if (board[Number(chooseTurnItem.id) + 45] == null) {
              if (
                board[Number(chooseTurnItem.id) + 54]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 54);
                botMoveChange(tableData);
              } else if (board[Number(chooseTurnItem.id) + 54] == null) {
                if (
                  board[Number(chooseTurnItem.id) + 63]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 63);
                  botMoveChange(tableData);
                } else if (board[Number(chooseTurnItem.id) + 63] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 63);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 54);
                  botMoveChange(tableData);
                }
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 45);
                botMoveChange(tableData);
              }
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 36);
              botMoveChange(tableData);
            }
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 27);
            botMoveChange(tableData);
          }
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 18);
          botMoveChange(tableData);
        }
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 9);
        botMoveChange(tableData);
      }
    }
  }

  // FOR 7
  if (Number(chooseTurnItem.id) == 7) {
    // TO UPWARD
    if (board[Number(chooseTurnItem.id) + 14]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 14);
      botMoveChange(tableData);
      return;
    } else if (board[Number(chooseTurnItem.id) + 14] == null) {
      if (board[Number(chooseTurnItem.id) + 21]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 21);
        botMoveChange(tableData);
        return;
      } else if (board[Number(chooseTurnItem.id) + 21] == null) {
        if (board[Number(chooseTurnItem.id) + 28]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 28);
          botMoveChange(tableData);
          return;
        } else if (board[Number(chooseTurnItem.id) + 28] == null) {
          if (board[Number(chooseTurnItem.id) + 35]?.name.includes("WHITE")) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 35);
            botMoveChange(tableData);
          } else if (board[Number(chooseTurnItem.id) + 35] == null) {
            if (board[Number(chooseTurnItem.id) + 42]?.name.includes("WHITE")) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 42);
              botMoveChange(tableData);
            } else if (board[Number(chooseTurnItem.id) + 42] == null) {
              if (
                board[Number(chooseTurnItem.id) + 49]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 49);
                botMoveChange(tableData);
              } else if (board[Number(chooseTurnItem.id) + 49] == null) {
                if (
                  board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                } else if (board[Number(chooseTurnItem.id) + 56] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 49);
                  botMoveChange(tableData);
                }
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 42);
                botMoveChange(tableData);
              }
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 35);
              botMoveChange(tableData);
            }
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 28);
            botMoveChange(tableData);
          }
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 21);
          botMoveChange(tableData);
        }
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 14);
        botMoveChange(tableData);
        return;
      }
    }
  }

  // FOR KILL WHITE TO +7 MOVE
  if (board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7);
    botMoveChange(tableData);
    return;
  } else if (
    board[Number(chooseTurnItem.id) + 7] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 7)
  ) {
    if (board[Number(chooseTurnItem.id) + 14]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 14);
      botMoveChange(tableData);
      return;
    } else if (
      board[Number(chooseTurnItem.id) + 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 14)
    ) {
      if (board[Number(chooseTurnItem.id) + 21]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 21);
        botMoveChange(tableData);
        return;
      } else if (
        board[Number(chooseTurnItem.id) + 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 21)
      ) {
        if (board[Number(chooseTurnItem.id) + 28]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 28);
          botMoveChange(tableData);
          return;
        } else if (
          board[Number(chooseTurnItem.id) + 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 28)
        ) {
          if (board[Number(chooseTurnItem.id) + 35]?.name.includes("WHITE")) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 35);
            botMoveChange(tableData);
            return;
          } else if (
            board[Number(chooseTurnItem.id) + 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 35)
          ) {
            if (board[Number(chooseTurnItem.id) + 42]?.name.includes("WHITE")) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 42);
              botMoveChange(tableData);
              return;
            } else if (
              board[Number(chooseTurnItem.id) + 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 42)
            ) {
              if (
                board[Number(chooseTurnItem.id) + 49]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 49);
                botMoveChange(tableData);
                return;
              } else if (
                board[Number(chooseTurnItem.id) + 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) + 49)
              ) {
                if (
                  board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }

  // FOR KILL WHITE TO +9 MOVE
  if (board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 9);
    botMoveChange(tableData);
    return;
  } else if (board[Number(chooseTurnItem.id) + 9] == null) {
    if (board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 18);
      botMoveChange(tableData);
    } else if (board[Number(chooseTurnItem.id) + 18] == null) {
      if (board[Number(chooseTurnItem.id) + 27]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 27);
        botMoveChange(tableData);
      } else if (board[Number(chooseTurnItem.id) + 27] == null) {
        if (board[Number(chooseTurnItem.id) + 36]?.name.includes("WHITE")) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 36);
          botMoveChange(tableData);
        } else if (board[Number(chooseTurnItem.id) + 36] == null) {
          if (board[Number(chooseTurnItem.id) + 45]?.name.includes("WHITE")) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 45);
            botMoveChange(tableData);
          } else if (board[Number(chooseTurnItem.id) + 45] == null) {
            if (board[Number(chooseTurnItem.id) + 54]?.name.includes("WHITE")) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 54);
              botMoveChange(tableData);
            } else if (board[Number(chooseTurnItem.id) + 54] == null) {
              if (
                board[Number(chooseTurnItem.id) + 63]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 63);
                botMoveChange(tableData);
              } else if (board[Number(chooseTurnItem.id) + 63] == null) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 63);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 54);
                botMoveChange(tableData);
              }
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 45);
              botMoveChange(tableData);
            }
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 36);
            botMoveChange(tableData);
          }
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 27);
          botMoveChange(tableData);
        }
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 18);
        botMoveChange(tableData);
      }
    } else {
      tableData.board = makeBotBoard(board, chooseTurnItem, 9);
      botMoveChange(tableData);
    }
  }
};

export default botBlackBishopMove;
