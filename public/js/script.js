let socket = io();

let player;
let clickId = "";
let turn = true;
let playerTurn;
let playerSocket;
let gameData;
let chessBoard;
let tableId;
let userId;
let imageSrc;
let killPieceId;
let className;
let pieceColor;
let selectChessItem = {
  indexofChesscheck: 0,
};
let roundTimeInterval;
// TIMER
let turnDownTimerInterval;
let movePiecesInterval;
let turnDownTimer = 10;
let counterVal;

// sendToSocket
const sendToSocket = (socket, data) => {
  console.log("client chess data ::", data.eventName);
  console.log("Socket Id ====", socket.id);
  socket.emit(data.eventName, data);
};

let sessionTableId = sessionStorage.getItem("tableId");
let sessionUserId = sessionStorage.getItem("userId");
if (sessionTableId && sessionUserId) {
  let sinUpData = {
    eventName: "JOIN",
    data: {
      tableId: sessionTableId,
      userId: sessionUserId,
    },
  };
  sendToSocket(socket, sinUpData);
}

let cornerNumber = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57,
  58, 59, 60, 61, 62, 63,
];

let emptyBox = document.getElementsByTagName("td");
let button = document.getElementById("chess_button");
let leaveBtn = document.getElementById("leave_button");

leaveBtn.addEventListener("click", () => {
  let leaveData = {
    eventName: "LEAVE_TABLE",
    data: {
      tableId: sessionStorage.getItem("tableId"),
      userId: sessionStorage.getItem("userId"),
    },
  };
  sendToSocket(socket, leaveData);
});

function chessGame() {
  do {
    player = prompt("Please enter your name:");
  } while (!player);

  sendToSocket(socket, {
    eventName: "JOIN",
    data: { playername: player, socketId: socket.id, turn: turn, isBot: false },
  });
}

button.addEventListener("click", () => {
  chessGame();
});

eventHandler(socket);

function Join(data) {
  gameData = data;
  chessBoard = gameData.board;
  tableId = gameData.tableId;
  sessionStorage.setItem("tableId", tableId);
  document.getElementById("chess_button").disabled = true;
  leaveBtn.style.display = "block";
  pieceColor = gameData.pieceColor;

  if (gameData.playerInfo.length < 2) {
    document.getElementById("turnMessage").innerText =
      "Waiting for other player";
    playerSocket = gameData.playerInfo[0].socketId;

    userId = gameData.playerInfo[0]._id;
    sessionStorage.setItem("userId", gameData.playerInfo[0]._id);
  } else {
    playerTurn = gameData.playerInfo[0].turn;
    userId = gameData.playerInfo[1]._id;
    sessionStorage.setItem("userId", gameData.playerInfo[1]._id);
  }
  sessionStorage.setItem(
    "id",
    gameData.playerInfo[gameData.playerInfo.length - 1].socketId
  );
  let getSocketId = sessionStorage.getItem("id");
  if (
    gameData.playerInfo[gameData.playerInfo.length - 1].socketId == getSocketId
  ) {
    console.log("join player==================", gameData.playerInfo);
    document.getElementById("playerName").innerHTML =
      gameData.playerInfo[gameData.playerInfo.length - 1].playername;
  }
}

function Start(data) {
  document.getElementById("turnMessage").innerHTML = "";
  var countDownTime = data.roundTimer;

  roundTimeInterval = setInterval(() => {
    var counter = countDownTime--;
    document.getElementById("roundTimer").innerHTML = counter;
    if (counter == 0) {
      clearInterval(roundTimeInterval);
      document.getElementById("roundTimer").innerHTML = "Game Started";

      setTimeout(() => {
        document.getElementById("roundTimer").style.display = "none";
        if (data.currentturn == userId) {
          document.getElementById("maindiv").style.pointerEvents = "";
        } else {
          document.getElementById("maindiv").style.pointerEvents = "none";
        }
        document.getElementById("turnMessage").innerHTML = data.turnMessage;
      }, 2000);
    }
  }, 1000);
}

function findChessCell(cellId) {
  const objectId = cellId;
  let parse = parseInt(objectId.id);
  className = document
    .getElementById(cellId.id)
    .getElementsByTagName("img")
    .item(0).className;

  const index = chessBoard.findIndex((item) => {
    return item && item.id === parse;
  });

  console.log("index: >", index);
  console.log("className: >", className);
  return index;
}

function chessClick(divId) {
  console.log("divId :", divId);
  resetClick();
  selectChessItem.indexofChesscheck = divId;
  let imgTag = document.getElementById(divId).getElementsByTagName("img");
  console.log(imgTag);

  clickId = imgTag[0].id;

  selectChessItem.indexofChesscheck = findChessCell({
    id: divId,
    name: clickId,
  });

  if (clickId.includes("BLACK_PAWN")) {
    isPawnMove();
  } else if (clickId.includes("BLACK_KNIGHT")) {
    isKnightMove();
  } else if (clickId.includes("BLACK_BISHOP")) {
    isBishopMove();
  } else if (clickId.includes("BLACK_ROOK")) {
    isBlackRook();
  } else if (clickId.includes("BLACK_KING")) {
    isBlackKing();
  } else if (clickId.includes("BLACK_QUREEN")) {
    isBlackQueen();
  } else if (clickId.includes("WHITE_PAWN")) {
    iswhitePawn();
  } else if (clickId.includes("WHITE_KNIGHT")) {
    isWhiteKnight();
  } else if (clickId.includes("WHITE_BISHOP")) {
    isWhiteBishop();
  } else if (clickId.includes("WHITE_ROOK")) {
    isWhiteRook();
  } else if (clickId.includes("WHITE_KING")) {
    isWhiteKing();
  } else if (clickId.includes("WHITE_QUREEN")) {
    isWhiteQueen();
  }
}

function resetClick() {
  for (let i = 0; i < emptyBox.length; i++) {
    emptyBox[i].style.background = "";
  }
}

function isPawnMove() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";

  if (pieceColor != "black") {
    return;
  }

  if (chessBoard[selectChessItem.indexofChesscheck + 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
        "onClick",
        "makeMove(8)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
        "#27AE60";
    }
    if (
      chessBoard[selectChessItem.indexofChesscheck].isFirstMove == true &&
      chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 16]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
        "onClick",
        "makeMove(16)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
        "#27AE60";
    }
  }
  let pawnOne =
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    pawnOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let pawn_Two =
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    pawn_Two === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#CA2F1F";
  }
}

function isKnightMove() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";

  if (pieceColor != "black") {
    return;
  }

  let wKIndexOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 15
  );
  let stopSuggetion = false;

  if (
    wKIndexOne != -1 &&
    cornerNumber[selectChessItem.indexofChesscheck % 2] == 1 &&
    cornerNumber[wKIndexOne] <= selectChessItem.indexofChesscheck + 15 &&
    chessBoard[selectChessItem.indexofChesscheck + 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#27AE60";
  } else if (
    wKIndexOne == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#27AE60";
  }
  let wkIndexTwo = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 17
  );
  if (
    stopSuggetion == false &&
    wkIndexTwo != -1 &&
    selectChessItem.indexofChesscheck <= 8 &&
    cornerNumber[wkIndexTwo] <= selectChessItem.indexofChesscheck + 17 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  } else if (
    wkIndexTwo != -1 &&
    selectChessItem.indexofChesscheck <= 8 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  } else if (
    wkIndexTwo == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  }
  let wkIndexThree = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 6
  );

  if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    selectChessItem.indexofChesscheck % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    (selectChessItem.indexofChesscheck + 6) % 2 == 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree == -1 &&
    (!cornerNumber.includes(selectChessItem.indexofChesscheck) ||
      selectChessItem.indexofChesscheck % 2 != 0) &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  }
  let wkIndexFour = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 10
  );

  if (
    stopSuggetion == false &&
    wkIndexFour != -1 &&
    cornerNumber[wkIndexFour] <= selectChessItem.indexofChesscheck + 10 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );

    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexFour == -1 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == true &&
    wkIndexFour == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  }

  let wKIndexMinusOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 15
  );
  if (
    wKIndexMinusOne != -1 &&
    cornerNumber[wKIndexMinusOne] <= selectChessItem.indexofChesscheck - 15 &&
    chessBoard[selectChessItem.indexofChesscheck - 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#27AE60";
  } else if (
    chessBoard[selectChessItem.indexofChesscheck - 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#27AE60";
  }
  let wkIndexMinusTwo = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 17
  );
  if (
    stopSuggetion == false &&
    wkIndexMinusTwo != -1 &&
    cornerNumber[wkIndexMinusTwo] <= selectChessItem.indexofChesscheck + 17 &&
    chessBoard[selectChessItem.indexofChesscheck - 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
      "onClick",
      "makeMove(-17)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
      "#27AE60";
  } else if (
    chessBoard[selectChessItem.indexofChesscheck - 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
      "onClick",
      "makeMove(-17)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
      "#27AE60";
  }
  let wkIndexMinusThree = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 6
  );

  if (
    stopSuggetion == false &&
    wkIndexMinusThree != -1 &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree == -1 &&
    stopSuggetion == false &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree == -1 &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree != -1 &&
    stopSuggetion == true &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    (selectChessItem.indexofChesscheck - 6) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree != -1 &&
    stopSuggetion == false &&
    cornerNumber.includes(selectChessItem.indexofChesscheck - 6) &&
    (selectChessItem.indexofChesscheck - 6) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  }
  let wkIndexMinusFour = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 10
  );

  if (
    stopSuggetion == false &&
    wkIndexMinusFour != -1 &&
    cornerNumber[wkIndexMinusFour] <= selectChessItem.indexofChesscheck - 10 &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusFour == -1 &&
    stopSuggetion == true &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  }
  let classOne =
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    classOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 6] &&
    emptyBox[selectChessItem.indexofChesscheck + 6] &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck)
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#CA2F1F";
  }
  let classTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck + 10)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 10)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    classTwo === "WHITE_PIECE" &&
    cornerNumber.includes(selectChessItem.indexofChesscheck + 10) &&
    (selectChessItem.indexofChesscheck + 10) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    // return;
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#CA2F1F";
  } else if (
    classTwo === "WHITE_PIECE" &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck + 10) &&
    chessBoard[selectChessItem.indexofChesscheck + 10] &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#CA2F1F";
  }
  let classThree =
    document
      .getElementById(selectChessItem.indexofChesscheck + 15)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 15)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 15] &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#CA2F1F";
  }
  let classFour =
    document
      .getElementById(selectChessItem.indexofChesscheck + 17)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 17)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 17] &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    if (
      !(
        selectChessItem.indexofChesscheck % 2 != 0 &&
        cornerNumber.includes(selectChessItem.indexofChesscheck)
      )
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
        "onClick",
        "makeMove(17)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
        "#CA2F1F";
    }
  }

  let classFive =
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let classSix =
    document
      .getElementById(selectChessItem.indexofChesscheck - 10)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 10)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 10] &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#CA2F1F";
  }
  let classSeven =
    document
      .getElementById(selectChessItem.indexofChesscheck - 15)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 15)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 15] &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#CA2F1F";
  }
  let classEight =
    document
      .getElementById(selectChessItem.indexofChesscheck - 17)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 17)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classEight === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 17] &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
      "onClick",
      "makeMove(-17)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
      "#CA2F1F";
  }
}

function isBishopMove() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "black") {
    return;
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 7] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 14
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 21
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 21 &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 28
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 28 &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 35
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 35 &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 9 &&
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 18 &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 27
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 27 &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 36
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 36 &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 45
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 45 &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 7] === null) {
    let stopSuggetion = false;
    if (
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 14
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    }

    let findIndextwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 21
    );
    if (
      findIndextwo != -1 &&
      cornerNumber[findIndextwo] <= selectChessItem.indexofChesscheck - 21 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 28
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 28 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 351
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 35 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 9 &&
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck - 18 &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 27
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 27 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 36
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 36 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 45
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 45 &&
      chessBoard[selectChessItem.indexofChesscheck - 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
        "onClick",
        "makeMove(-45)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
        "#27AE60";
    }
  }
  let classOne =
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    classOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let classTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 14] &&
    emptyBox[selectChessItem.indexofChesscheck + 14]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
      "onClick",
      "makeMove(14)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
      "#CA2F1F";
  }
  let classThree =
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 21] &&
    emptyBox[selectChessItem.indexofChesscheck + 21]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
      "onClick",
      "makeMove(21)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
      "#CA2F1F";
  }
  let classFour =
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 28] &&
    emptyBox[selectChessItem.indexofChesscheck + 28]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
      "onClick",
      "makeMove(28)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
      "#CA2F1F";
  }
  let classFive =
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 35] &&
    emptyBox[selectChessItem.indexofChesscheck + 35]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
      "onClick",
      "makeMove(35)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
      "#CA2F1F";
  }
  let classSix =
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9]
  ) {
    if (
      classSix === "WHITE_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck + 9] &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#CA2F1F";
    }
    let classSeven =
      document
        .getElementById(selectChessItem.indexofChesscheck + 18)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck + 18)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classSeven === "WHITE_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck + 18] &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(19)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#CA2F1F";
    }
    let classEight =
      document
        .getElementById(selectChessItem.indexofChesscheck + 27)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck + 27)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classEight === "WHITE_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck + 27] &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#CA2F1F";
    }
    let classNine =
      document
        .getElementById(selectChessItem.indexofChesscheck + 36)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck + 36)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classNine === "WHITE_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck + 36] &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#CA2F1F";
    }
    let classTen =
      document
        .getElementById(selectChessItem.indexofChesscheck + 45)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck + 45)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classTen === "WHITE_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck + 45] &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#CA2F1F";
    }
  }
}

function isBlackRook() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";

  if (pieceColor != "black") {
    return;
  }

  if (chessBoard[selectChessItem.indexofChesscheck - 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck - 2 &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck - 3 &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck - 4 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck - 5 &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck - 6 &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck - 7 &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#27AE60";

    if (
      chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 16]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
        "onClick",
        "makeMove(8)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
        "#27AE60";

      if (
        chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
        emptyBox[selectChessItem.indexofChesscheck + 24]
      ) {
        emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
          "onClick",
          "makeMove(8)"
        );
        emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
          "#27AE60";

        if (
          chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
          emptyBox[selectChessItem.indexofChesscheck + 32]
        ) {
          emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
            "onClick",
            "makeMove(8)"
          );
          emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
            "#27AE60";

          if (
            chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
            emptyBox[selectChessItem.indexofChesscheck + 40]
          ) {
            emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
              "onClick",
              "makeMove(8)"
            );
            emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
              "#27AE60";
          }
        }
      }
    }
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
      "onClick",
      "makeMove(-16)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
      "onClick",
      "makeMove(-24)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
      "onClick",
      "makeMove(-32)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
      "onClick",
      "makeMove(-40)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 40].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
      "onClick",
      "makeMove(-48)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 48].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 56] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
      "onClick",
      "makeMove(-56)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 56].style.background =
      "#27AE60";
  }

  let rookIndexOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 1
  );

  let disableSuggestion = false;
  if (
    rookIndexOne != -1 &&
    cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#27AE60";
  } else if (
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#27AE60";
  }
  let rookIndexTwo = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 2
  );
  if (
    disableSuggestion == false &&
    rookIndexTwo != -1 &&
    cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck + 2 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 2]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
      "onClick",
      "makeMove(2)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
      "onClick",
      "makeMove(2)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
      "#27AE60";
  }
  let rookIndexThree = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 3
  );
  if (
    disableSuggestion == false &&
    rookIndexThree != -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck + 3 &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 3]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
      "onClick",
      "makeMove(3)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
      "onClick",
      "makeMove(3)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
      "#27AE60";
  }
  let rookIndexFour = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 4
  );
  if (
    disableSuggestion == false &&
    rookIndexFour != -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck + 4 &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 4]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
      "onClick",
      "makeMove(4)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
      "onClick",
      "makeMove(4)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
      "#27AE60";
  }
  let rookIndexFive = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 5
  );
  if (
    disableSuggestion == false &&
    rookIndexFive != -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck + 5 &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 5]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
      "onClick",
      "makeMove(5)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
      "onClick",
      "makeMove(5)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
      "#27AE60";
  }
  let rookIndexFSix = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 6
  );
  if (
    disableSuggestion == false &&
    rookIndexFSix != -1 &&
    cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck + 6 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  }
  let rookIndexFSeven = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 7
  );
  if (
    disableSuggestion == false &&
    rookIndexFSeven != -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck + 7 &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    disableSuggestion = true;
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#27AE60";
  } else if (
    disableSuggestion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#27AE60";
  }

  let stopSuggetion = false;

  let blackClassOne =
    document.getElementById(selectChessItem.indexofChesscheck + 8) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    blackClassOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#27AE60";
  }

  let blackClassTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    blackClassTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 16]
  ) {
    stopSuggetion = true;
  }
  if (
    blackClassTwo == "WHITE_PIECE" &&
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#27AE60";
  }
  let blackClassThree =
    document.getElementById(selectChessItem.indexofChesscheck + 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    blackClassThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24]
  ) {
    stopSuggetion = true;
  }
  if (
    blackClassThree == "WHITE_PIECE" &&
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#27AE60";
  }
  let blackClassFour =
    document.getElementById(selectChessItem.indexofChesscheck + 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    blackClassFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 32]
  ) {
    stopSuggetion = true;
  }
  if (
    blackClassFour == "WHITE_PIECE" &&
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] &&
    emptyBox[selectChessItem.indexofChesscheck + 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
      "onClick",
      "makeMove(32)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
      "#27AE60";
  }
  let blackClassfive =
    document.getElementById(selectChessItem.indexofChesscheck + 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    blackClassfive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40]
  ) {
    stopSuggetion = true;
  }
  if (
    blackClassfive == "WHITE_PIECE" &&
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] &&
    emptyBox[selectChessItem.indexofChesscheck + 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
      "onClick",
      "makeMove(40)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
      "#27AE60";
  }
  let blackClassSix =
    document.getElementById(selectChessItem.indexofChesscheck + 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    blackClassSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48]
  ) {
    stopSuggetion = true;
  }
  if (
    blackClassSix == "WHITE_PIECE" &&
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] &&
    emptyBox[selectChessItem.indexofChesscheck + 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
      "onClick",
      "makeMove(48)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
      "#27AE60";
  }
  let blackClassSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    blackClassSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 56]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 56] &&
    emptyBox[selectChessItem.indexofChesscheck + 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
      "onClick",
      "makeMove(56)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
      "#27AE60";
  }

  let rookOne =
    document.getElementById(selectChessItem.indexofChesscheck + 8) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    rookOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
  let rookTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#CA2F1F";
  }
  let rookThree =
    document.getElementById(selectChessItem.indexofChesscheck + 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#CA2F1F";
  }
  let rookFour =
    document.getElementById(selectChessItem.indexofChesscheck + 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] &&
    emptyBox[selectChessItem.indexofChesscheck + 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
      "onClick",
      "makeMove(32)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
      "#CA2F1F";
  }
  let rookFive =
    document.getElementById(selectChessItem.indexofChesscheck + 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] &&
    emptyBox[selectChessItem.indexofChesscheck + 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
      "onClick",
      "makeMove(40)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
      "#CA2F1F";
  }
  let rookSix =
    document.getElementById(selectChessItem.indexofChesscheck + 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    rookSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] &&
    emptyBox[selectChessItem.indexofChesscheck + 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
      "onClick",
      "makeMove(48)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
      "#CA2F1F";
  }
  let rookSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] == null &&
    chessBoard[selectChessItem.indexofChesscheck + 56] &&
    emptyBox[selectChessItem.indexofChesscheck + 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
      "onClick",
      "makeMove(56)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
      "#CA2F1F";
  }
  let BROne =
    document.getElementById(selectChessItem.indexofChesscheck - 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    BROne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let BRTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] &&
    emptyBox[selectChessItem.indexofChesscheck - 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
      "onClick",
      "makeMove(-2)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
      "#CA2F1F";
  }
  let BRThree =
    document.getElementById(selectChessItem.indexofChesscheck - 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] &&
    emptyBox[selectChessItem.indexofChesscheck - 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
      "onClick",
      "makeMove(-3)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
      "#CA2F1F";
  }
  let BRFour =
    document.getElementById(selectChessItem.indexofChesscheck - 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] &&
    emptyBox[selectChessItem.indexofChesscheck - 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
      "onClick",
      "makeMove(-4)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
      "#CA2F1F";
  }
  let BRFive =
    document.getElementById(selectChessItem.indexofChesscheck - 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] &&
    emptyBox[selectChessItem.indexofChesscheck - 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
      "onClick",
      "makeMove(-5)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
      "#CA2F1F";
  }
  let BRSix =
    document.getElementById(selectChessItem.indexofChesscheck - 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let BRSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
}

function isBlackKing() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "black") {
    return;
  }
  let stopSuggetion = false;
  let kingIndexOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 1
  );
  if (
    kingIndexOne != -1 &&
    cornerNumber[kingIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#27AE60";
  } else if (
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#27AE60";
  }
  let IndexMinusOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 1
  );
  if (
    IndexMinusOne != -1 &&
    cornerNumber[IndexMinusOne] <= selectChessItem.indexofChesscheck - 1 &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#27AE60";
  }
  let BlackOne =
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#CA2F1F";
  }
  let BlackTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let BlackThree =
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let BlackFour =
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
  let BlackFive =
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#CA2F1F";
  }
  let BlackSix =
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let BlackSeven =
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#CA2F1F";
  }
  let BlackEight =
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BlackEight === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
}

// function isBlackQueen() {
//   document.getElementById(selectChessItem.indexofChesscheck).style.background =
//     "#BBCB2B";
//   if (pieceColor != "black") {
//     return;
//   }
//   if (chessBoard[selectChessItem.indexofChesscheck + 7] === null) {
//     let stopSuggetion = false;
//     let findIndexOne = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 7
//     );
//     if (
//       findIndexOne != -1 &&
//       cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 7 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 7]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//         "onClick",
//         "makeMove(7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//         "#27AE60";
//     } else if (
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 7]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//         "onClick",
//         "makeMove(7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//         "#27AE60";
//     }
//     let findIndexTwo = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 14
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexTwo != -1 &&
//       cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 14 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 14]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
//         "onClick",
//         "makeMove(14)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 14]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
//         "onClick",
//         "makeMove(14)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
//         "#27AE60";
//     }
//     let findIndexThree = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 21
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexThree != -1 &&
//       cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 21 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 21]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
//         "onClick",
//         "makeMove(21)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 21]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
//         "onClick",
//         "makeMove(21)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
//         "#27AE60";
//     }
//     let findIndexFour = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 28
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexFour != -1 &&
//       cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 28 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 28]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
//         "onClick",
//         "makeMove(28)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 28]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
//         "onClick",
//         "makeMove(28)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
//         "#27AE60";
//     }
//     let findIndexFive = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 35
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexFive != -1 &&
//       cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 35 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 35]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
//         "onClick",
//         "makeMove(35)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 35]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
//         "onClick",
//         "makeMove(35)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
//         "#27AE60";
//     }
//     let findIndexSix = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 42
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexSix != -1 &&
//       cornerNumber[findIndexSix] <= selectChessItem.indexofChesscheck + 42 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 42] &&
//       emptyBox[selectChessItem.indexofChesscheck + 42]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 42].setAttribute(
//         "onClick",
//         "makeMove(42)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 42].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 42] &&
//       emptyBox[selectChessItem.indexofChesscheck + 42]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 42].setAttribute(
//         "onClick",
//         "makeMove(42)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 42].style.background =
//         "#27AE60";
//     }
//     let findIndexSeven = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 49
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexSix != -1 &&
//       cornerNumber[findIndexSeven] <= selectChessItem.indexofChesscheck + 49 &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 42] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 49] &&
//       emptyBox[selectChessItem.indexofChesscheck + 49]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 49].setAttribute(
//         "onClick",
//         "makeMove(49)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 49].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 42] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 49] &&
//       emptyBox[selectChessItem.indexofChesscheck + 49]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 49].setAttribute(
//         "onClick",
//         "makeMove(49)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 49].style.background =
//         "#27AE60";
//     }
//   }
//   if (chessBoard[selectChessItem.indexofChesscheck + 9] === null) {
//     let stopSuggetion = false;
//     let findIndexOne = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 9
//     );
//     if (
//       findIndexOne != -1 &&
//       cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 9 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 9]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
//         "onClick",
//         "makeMove(9)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
//         "#27AE60";
//     } else if (
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 9]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
//         "onClick",
//         "makeMove(9)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
//         "#27AE60";
//     }
//     let findIndexTwo = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 18
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexTwo != -1 &&
//       cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 18 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 18]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
//         "onClick",
//         "makeMove(18)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 18]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
//         "onClick",
//         "makeMove(18)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
//         "#27AE60";
//     }
//     let findIndexThree = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 27
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexThree != -1 &&
//       cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 27 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 27]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
//         "onClick",
//         "makeMove(27)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 27]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
//         "onClick",
//         "makeMove(27)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
//         "#27AE60";
//     }
//     let findIndexFour = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 36
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexFour != -1 &&
//       cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 36 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 36]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
//         "onClick",
//         "makeMove(36)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 36]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
//         "onClick",
//         "makeMove(36)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
//         "#27AE60";
//     }
//     let findIndexFive = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 45
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexFive != -1 &&
//       cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 45 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 45]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
//         "onClick",
//         "makeMove(45)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 45]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
//         "onClick",
//         "makeMove(45)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
//         "#27AE60";
//     }
//     let findIndexSix = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 54
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexSix != -1 &&
//       cornerNumber[findIndexSix] <= selectChessItem.indexofChesscheck + 45 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 54] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 54]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 54].setAttribute(
//         "onClick",
//         "makeMove(54)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 54].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 54] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 54]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 54].setAttribute(
//         "onClick",
//         "makeMove(54)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 54].style.background =
//         "#27AE60";
//     }
//     let findIndexSeven = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 63
//     );
//     if (
//       stopSuggetion == false &&
//       findIndexSeven != -1 &&
//       cornerNumber[findIndexSeven] <= selectChessItem.indexofChesscheck + 63 &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 54] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 63] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 63]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 63].setAttribute(
//         "onClick",
//         "makeMove(63)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 63].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 54] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 63] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 63]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 63].setAttribute(
//         "onClick",
//         "makeMove(63)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 63].style.background =
//         "#27AE60";
//     }
//   }
//   if (chessBoard[selectChessItem.indexofChesscheck - 7] === null) {
//     let stopSuggetion = false;
//     if (
//       chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 7]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
//         "onClick",
//         "makeMove(-7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
//         "#27AE60";
//       let findIndexOne = cornerNumber.findIndex(
//         (item) => item == selectChessItem.indexofChesscheck - 14
//       );
//       if (
//         findIndexOne != -1 &&
//         cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 14 &&
//         stopSuggetion == false &&
//         chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
//         emptyBox[selectChessItem.indexofChesscheck - 14]
//       ) {
//         stopSuggetion = true;
//         emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
//           "onClick",
//           "makeMove(-14)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
//           "#27AE60";
//       } else if (
//         stopSuggetion == false &&
//         chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
//         emptyBox[selectChessItem.indexofChesscheck - 14]
//       ) {
//         emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
//           "onClick",
//           "makeMove(-14)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
//           "#27AE60";
//         let findIndextwo = cornerNumber.findIndex(
//           (item) => item == selectChessItem.indexofChesscheck - 21
//         );
//         if (
//           findIndextwo != -1 &&
//           cornerNumber[findIndextwo] <=
//             selectChessItem.indexofChesscheck - 21 &&
//           stopSuggetion == false &&
//           chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
//           emptyBox[selectChessItem.indexofChesscheck - 21]
//         ) {
//           stopSuggetion = true;
//           emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
//             "onClick",
//             "makeMove(-21)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
//             "#27AE60";
//         } else if (
//           stopSuggetion == false &&
//           chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
//           emptyBox[selectChessItem.indexofChesscheck - 21]
//         ) {
//           emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
//             "onClick",
//             "makeMove(-21)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
//             "#27AE60";
//           let findIndexThree = cornerNumber.findIndex(
//             (item) => item == selectChessItem.indexofChesscheck - 28
//           );
//           if (
//             findIndexThree != -1 &&
//             cornerNumber[findIndexThree] <=
//               selectChessItem.indexofChesscheck - 28 &&
//             stopSuggetion == false &&
//             chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
//             emptyBox[selectChessItem.indexofChesscheck - 28]
//           ) {
//             stopSuggetion = true;
//             emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
//               "onClick",
//               "makeMove(-28)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
//               "#27AE60";
//           } else if (
//             stopSuggetion == false &&
//             chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
//             emptyBox[selectChessItem.indexofChesscheck - 28]
//           ) {
//             emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
//               "onClick",
//               "makeMove(-28)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
//               "#27AE60";
//             let findIndexFour = cornerNumber.findIndex(
//               (item) => item == selectChessItem.indexofChesscheck - 35
//             );
//             if (
//               findIndexFour != -1 &&
//               cornerNumber[findIndexFour] <=
//                 selectChessItem.indexofChesscheck - 35 &&
//               stopSuggetion == false &&
//               chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
//               emptyBox[selectChessItem.indexofChesscheck - 35]
//             ) {
//               stopSuggetion = true;
//               emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
//                 "onClick",
//                 "makeMove(-35)"
//               );
//               emptyBox[
//                 selectChessItem.indexofChesscheck - 35
//               ].style.background = "#27AE60";
//             } else if (
//               stopSuggetion == false &&
//               chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
//               emptyBox[selectChessItem.indexofChesscheck - 35]
//             ) {
//               emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
//                 "onClick",
//                 "makeMove(-35)"
//               );
//               emptyBox[
//                 selectChessItem.indexofChesscheck - 35
//               ].style.background = "#27AE60";
//             }
//           }
//         }
//       }
//     }
//   }
//   if (chessBoard[selectChessItem.indexofChesscheck - 9] === null) {
//     let stopSuggetion = false;
//     let findIndexOne = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 9
//     );
//     if (
//       findIndexOne != -1 &&
//       cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 9 &&
//       chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 9]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
//         "onClick",
//         "makeMove(-9)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
//         "#27AE60";
//     } else if (
//       chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 9]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
//         "onClick",
//         "makeMove(-9)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
//         "#27AE60";
//       let findIndexTwo = cornerNumber.findIndex(
//         (item) => item == selectChessItem.indexofChesscheck - 18
//       );
//       if (
//         stopSuggetion == false &&
//         findIndexTwo != -1 &&
//         cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck - 18 &&
//         chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
//         emptyBox[selectChessItem.indexofChesscheck - 18]
//       ) {
//         stopSuggetion = true;
//         emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
//           "onClick",
//           "makeMove(-18)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
//           "#27AE60";
//       } else if (
//         stopSuggetion == false &&
//         chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
//         emptyBox[selectChessItem.indexofChesscheck - 18]
//       ) {
//         emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
//           "onClick",
//           "makeMove(-18)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
//           "#27AE60";
//         let findIndexThree = cornerNumber.findIndex(
//           (item) => item == selectChessItem.indexofChesscheck - 27
//         );
//         if (
//           findIndexThree != -1 &&
//           cornerNumber[findIndexThree] <=
//             selectChessItem.indexofChesscheck - 27 &&
//           stopSuggetion == false &&
//           chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
//           emptyBox[selectChessItem.indexofChesscheck - 27]
//         ) {
//           stopSuggetion = true;
//           emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
//             "onClick",
//             "makeMove(-27)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
//             "#27AE60";
//         } else if (
//           stopSuggetion == false &&
//           chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
//           emptyBox[selectChessItem.indexofChesscheck - 27]
//         ) {
//           emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
//             "onClick",
//             "makeMove(-27)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
//             "#27AE60";
//           let findIndexFour = cornerNumber.findIndex(
//             (item) => item == selectChessItem.indexofChesscheck - 36
//           );
//           if (
//             findIndexFour != -1 &&
//             cornerNumber[findIndexFour] <=
//               selectChessItem.indexofChesscheck - 36 &&
//             stopSuggetion == false &&
//             chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
//             emptyBox[selectChessItem.indexofChesscheck - 36]
//           ) {
//             stopSuggetion = true;
//             emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
//               "onClick",
//               "makeMove(-36)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
//               "#27AE60";
//           } else if (
//             stopSuggetion == false &&
//             chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
//             emptyBox[selectChessItem.indexofChesscheck - 36]
//           ) {
//             emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
//               "onClick",
//               "makeMove(-36)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
//               "#27AE60";
//             let findIndexFive = cornerNumber.findIndex(
//               (item) => item == selectChessItem.indexofChesscheck - 45
//             );

//             if (
//               findIndexFive != -1 &&
//               cornerNumber[findIndexFive] <=
//                 selectChessItem.indexofChesscheck - 45 &&
//               chessBoard[selectChessItem.indexofChesscheck - 45] === null &&
//               emptyBox[selectChessItem.indexofChesscheck - 45]
//             ) {
//               emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
//                 "onClick",
//                 "makeMove(-45)"
//               );
//               emptyBox[
//                 selectChessItem.indexofChesscheck - 45
//               ].style.background = "#27AE60";
//             }
//           }
//         }
//       }
//     }
//   }

//   if (chessBoard[selectChessItem.indexofChesscheck + 8] === null) {
//     if (
//       chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 8]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
//         "onClick",
//         "makeMove(8)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
//         "#27AE60";
//       if (
//         chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//         emptyBox[selectChessItem.indexofChesscheck + 16]
//       ) {
//         emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
//           "onClick",
//           "makeMove(16)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
//           "#27AE60";
//         if (
//           chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
//           emptyBox[selectChessItem.indexofChesscheck + 24]
//         ) {
//           emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
//             "onClick",
//             "makeMove(24)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
//             "#27AE60";
//           if (
//             chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
//             emptyBox[selectChessItem.indexofChesscheck + 32]
//           ) {
//             emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
//               "onClick",
//               "makeMove(32)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
//               "#27AE60";
//             if (
//               chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
//               emptyBox[selectChessItem.indexofChesscheck + 40]
//             ) {
//               emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
//                 "onClick",
//                 "makeMove(40)"
//               );
//               emptyBox[
//                 selectChessItem.indexofChesscheck + 40
//               ].style.background = "#27AE60";
//               if (
//                 chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
//                 emptyBox[selectChessItem.indexofChesscheck + 48]
//               ) {
//                 emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
//                   "onClick",
//                   "makeMove(48)"
//                 );
//                 emptyBox[
//                   selectChessItem.indexofChesscheck + 48
//                 ].style.background = "#27AE60";
//                 if (
//                   chessBoard[selectChessItem.indexofChesscheck + 56] === null &&
//                   emptyBox[selectChessItem.indexofChesscheck + 56]
//                 ) {
//                   emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
//                     "onClick",
//                     "makeMove(56)"
//                   );
//                   emptyBox[
//                     selectChessItem.indexofChesscheck + 56
//                   ].style.background = "#27AE60";
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   if (chessBoard[selectChessItem.indexofChesscheck - 8] === null) {
//     if (
//       chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 8]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
//         "onClick",
//         "makeMove(-8)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
//         "#27AE60";
//       if (
//         chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
//         emptyBox[selectChessItem.indexofChesscheck - 16]
//       ) {
//         emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
//           "onClick",
//           "makeMove(-16)"
//         );
//         emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
//           "#27AE60";
//         if (
//           chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
//           emptyBox[selectChessItem.indexofChesscheck - 24]
//         ) {
//           emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
//             "onClick",
//             "makeMove(-24)"
//           );
//           emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
//             "#27AE60";
//           if (
//             chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
//             emptyBox[selectChessItem.indexofChesscheck - 32]
//           ) {
//             emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
//               "onClick",
//               "makeMove(-32)"
//             );
//             emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
//               "#27AE60";
//             if (
//               chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
//               emptyBox[selectChessItem.indexofChesscheck - 40]
//             ) {
//               emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
//                 "onClick",
//                 "makeMove(-40)"
//               );
//               emptyBox[
//                 selectChessItem.indexofChesscheck - 40
//               ].style.background = "#27AE60";
//               if (
//                 chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
//                 emptyBox[selectChessItem.indexofChesscheck - 48]
//               ) {
//                 emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
//                   "onClick",
//                   "makeMove(-48)"
//                 );
//                 emptyBox[
//                   selectChessItem.indexofChesscheck - 48
//                 ].style.background = "#27AE60";
//                 if (
//                   chessBoard[selectChessItem.indexofChesscheck - 56] === null &&
//                   emptyBox[selectChessItem.indexofChesscheck - 56]
//                 ) {
//                   emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
//                     "onClick",
//                     "makeMove(-56)"
//                   );
//                   emptyBox[
//                     selectChessItem.indexofChesscheck - 56
//                   ].style.background = "#27AE60";
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   if (chessBoard[selectChessItem.indexofChesscheck + 1] === null) {
//     let stopSuggetion = false;
//     let rookIndexOne = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 1
//     );
//     if (
//       rookIndexOne != -1 &&
//       cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 1]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
//         "onClick",
//         "makeMove(1)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
//         "#27AE60";
//     } else if (
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 1]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
//         "onClick",
//         "makeMove(1)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
//         "#27AE60";
//     }
//     let rookIndexTwo = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 2
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexTwo != -1 &&
//       cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck + 2 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 2]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
//         "onClick",
//         "makeMove(2)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 2]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
//         "onClick",
//         "makeMove(2)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
//         "#27AE60";
//     }
//     let rookIndexThree = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 3
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexThree != -1 &&
//       cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck + 3 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 3]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
//         "onClick",
//         "makeMove(3)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 3]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
//         "onClick",
//         "makeMove(3)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
//         "#27AE60";
//     }
//     let rookIndexFour = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 4
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFour != -1 &&
//       cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck + 4 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 4]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
//         "onClick",
//         "makeMove(4)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 4]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
//         "onClick",
//         "makeMove(4)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
//         "#27AE60";
//     }
//     let rookIndexFive = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 5
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFive != -1 &&
//       cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck + 5 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 5]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
//         "onClick",
//         "makeMove(5)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 5]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
//         "onClick",
//         "makeMove(5)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
//         "#27AE60";
//     }
//     let rookIndexFSix = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 6
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFSix != -1 &&
//       cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck + 6 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 6]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
//         "onClick",
//         "makeMove(6)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 6]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
//         "onClick",
//         "makeMove(6)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
//         "#27AE60";
//     }
//     let rookIndexFSeven = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck + 7
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFSeven != -1 &&
//       cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck + 7 &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 7]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//         "onClick",
//         "makeMove(7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
//       chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck + 7]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//         "onClick",
//         "makeMove(7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//         "#27AE60";
//     }
//   }

//   if (chessBoard[selectChessItem.indexofChesscheck - 1] === null) {
//     let stopSuggetion = false;
//     let rookIndexOne = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 1
//     );
//     if (
//       rookIndexOne != -1 &&
//       cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 1]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
//         "onClick",
//         "makeMove(-1)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
//         "#27AE60";
//     } else if (
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 1]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
//         "onClick",
//         "makeMove(-1)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
//         "#27AE60";
//     }
//     let rookIndexTwo = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 2
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexTwo != -1 &&
//       cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck - 2 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 2]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
//         "onClick",
//         "makeMove(-2)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 2]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
//         "onClick",
//         "makeMove(-2)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
//         "#27AE60";
//     }
//     let rookIndexThree = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 3
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexThree != -1 &&
//       cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck - 3 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 3]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
//         "onClick",
//         "makeMove(-3)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 3]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
//         "onClick",
//         "makeMove(-3)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
//         "#27AE60";
//     }
//     let rookIndexFour = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 4
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFour != -1 &&
//       cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck - 4 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 4]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
//         "onClick",
//         "makeMove(-4)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 4]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
//         "onClick",
//         "makeMove(-4)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
//         "#27AE60";
//     }
//     let rookIndexFive = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 5
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFive != -1 &&
//       cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck - 5 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 5]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
//         "onClick",
//         "makeMove(-5)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 5]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
//         "onClick",
//         "makeMove(-5)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
//         "#27AE60";
//     }
//     let rookIndexFSix = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 6
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFSix != -1 &&
//       cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck - 6 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 6]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
//         "onClick",
//         "makeMove(-6)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 6]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
//         "onClick",
//         "makeMove(-6)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
//         "#27AE60";
//     }
//     let rookIndexFSeven = cornerNumber.findIndex(
//       (item) => item == selectChessItem.indexofChesscheck - 7
//     );
//     if (
//       stopSuggetion == false &&
//       rookIndexFSeven != -1 &&
//       cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck - 7 &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 7]
//     ) {
//       stopSuggetion = true;
//       emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
//         "onClick",
//         "makeMove(-7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
//         "#27AE60";
//     } else if (
//       stopSuggetion == false &&
//       chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
//       chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
//       emptyBox[selectChessItem.indexofChesscheck - 7]
//     ) {
//       emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
//         "onClick",
//         "makeMove(-7)"
//       );
//       emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
//         "#27AE60";
//     }
//   }
//   let BQClassEight =
//     document.getElementById(selectChessItem.indexofChesscheck + 8) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 8)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 8)
//       .getElementsByTagName("img")
//       .item(0).className;

//   if (
//     BQClassEight === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] &&
//     emptyBox[selectChessItem.indexofChesscheck + 8]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
//       "onClick",
//       "makeMove(8)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
//       "#CA2F1F";
//   }
//   let BQClassSixteen =
//     document.getElementById(selectChessItem.indexofChesscheck + 16) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 16)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 16)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassSixteen === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] &&
//     emptyBox[selectChessItem.indexofChesscheck + 16]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
//       "onClick",
//       "makeMove(16)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
//       "#CA2F1F";
//   }
//   let BQClasssixteen =
//     document.getElementById(selectChessItem.indexofChesscheck + 24) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 24)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 24)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasssixteen === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 24] &&
//     emptyBox[selectChessItem.indexofChesscheck + 24]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
//       "onClick",
//       "makeMove(24)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
//       "#CA2F1F";
//   }
//   let BQClassTF =
//     document.getElementById(selectChessItem.indexofChesscheck + 32) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 32)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 32)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassTF === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 32] &&
//     emptyBox[selectChessItem.indexofChesscheck + 32]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
//       "onClick",
//       "makeMove(32)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFourty =
//     document.getElementById(selectChessItem.indexofChesscheck + 40) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 40)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 40)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFourty === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 40] &&
//     emptyBox[selectChessItem.indexofChesscheck + 40]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
//       "onClick",
//       "makeMove(40)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFE =
//     document.getElementById(selectChessItem.indexofChesscheck + 48) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 48)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 48)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFE === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 48] &&
//     emptyBox[selectChessItem.indexofChesscheck + 48]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
//       "onClick",
//       "makeMove(48)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFS =
//     document.getElementById(selectChessItem.indexofChesscheck + 56) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 56)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 56)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFS === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 56] &&
//     emptyBox[selectChessItem.indexofChesscheck + 56]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
//       "onClick",
//       "makeMove(56)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
//       "#CA2F1F";
//   }
//   let BQClassOne =
//     document.getElementById(selectChessItem.indexofChesscheck + 1) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 1)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 1)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassOne === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] &&
//     emptyBox[selectChessItem.indexofChesscheck + 1]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
//       "onClick",
//       "makeMove(1)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
//       "#CA2F1F";
//   }
//   let BQClassTwo =
//     document.getElementById(selectChessItem.indexofChesscheck + 2) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 2)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 2)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassTwo === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] &&
//     emptyBox[selectChessItem.indexofChesscheck + 2]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
//       "onClick",
//       "makeMove(2)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
//       "#CA2F1F";
//   }
//   let BQClassThree =
//     document.getElementById(selectChessItem.indexofChesscheck + 3) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 3)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 3)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassThree === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 3] &&
//     emptyBox[selectChessItem.indexofChesscheck + 3]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
//       "onClick",
//       "makeMove(3)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFour =
//     document.getElementById(selectChessItem.indexofChesscheck + 4) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 4)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 4)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFour === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 4] &&
//     emptyBox[selectChessItem.indexofChesscheck + 4]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
//       "onClick",
//       "makeMove(4)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFive =
//     document.getElementById(selectChessItem.indexofChesscheck + 5) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 5)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 5)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFive === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 5] &&
//     emptyBox[selectChessItem.indexofChesscheck + 5]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
//       "onClick",
//       "makeMove(5)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
//       "#CA2F1F";
//   }
//   let BQClassSix =
//     document.getElementById(selectChessItem.indexofChesscheck + 6) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 6)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 6)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassSix === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 6] &&
//     emptyBox[selectChessItem.indexofChesscheck + 6]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
//       "onClick",
//       "makeMove(6)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
//       "#CA2F1F";
//   }
//   let BQClassSeven =
//     document.getElementById(selectChessItem.indexofChesscheck + 7) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 7)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 7)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassSeven === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] &&
//     emptyBox[selectChessItem.indexofChesscheck + 7]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//       "onClick",
//       "makeMove(7)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//       "#CA2F1F";
//   }
//   let BQClassPSeven =
//     document.getElementById(selectChessItem.indexofChesscheck + 7) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 7)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 7)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassPSeven === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] &&
//     emptyBox[selectChessItem.indexofChesscheck + 7]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
//       "onClick",
//       "makeMove(7)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
//       "#CA2F1F";
//   }
//   let BQClassFourteen =
//     document.getElementById(selectChessItem.indexofChesscheck + 14) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 14)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 14)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassFourteen === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] &&
//     emptyBox[selectChessItem.indexofChesscheck + 14]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
//       "onClick",
//       "makeMove(14)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstOne =
//     document.getElementById(selectChessItem.indexofChesscheck + 21) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 21)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 21)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstOne === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 21] &&
//     emptyBox[selectChessItem.indexofChesscheck + 21]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
//       "onClick",
//       "makeMove(21)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
//       "#CA2F1F";
//   }
//   let BQClassTE =
//     document.getElementById(selectChessItem.indexofChesscheck + 28) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 28)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 28)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClassTE === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 28] &&
//     emptyBox[selectChessItem.indexofChesscheck + 28]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
//       "onClick",
//       "makeMove(28)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstTF =
//     document.getElementById(selectChessItem.indexofChesscheck + 35) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 35)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 35)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstTF === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 35] &&
//     emptyBox[selectChessItem.indexofChesscheck + 35]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
//       "onClick",
//       "makeMove(35)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstTT =
//     document.getElementById(selectChessItem.indexofChesscheck + 42) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 42)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 42)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstTT === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 42] &&
//     emptyBox[selectChessItem.indexofChesscheck + 42]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 42].setAttribute(
//       "onClick",
//       "makeMove(42)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 42].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstTN =
//     document.getElementById(selectChessItem.indexofChesscheck + 49) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 49)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 49)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstTN === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 42] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 49] &&
//     emptyBox[selectChessItem.indexofChesscheck + 49]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 49].setAttribute(
//       "onClick",
//       "makeMove(49)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 49].style.background =
//       "#CA2F1F";
//   }
//   let BQClassnine =
//     document.getElementById(selectChessItem.indexofChesscheck + 9) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 9)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 9)
//       .getElementsByTagName("img")
//       .item(0).className;

//   if (
//     BQClassnine === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] &&
//     emptyBox[selectChessItem.indexofChesscheck + 9]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
//       "onClick",
//       "makeMove(9)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
//       "#CA2F1F";
//   }
//   let BQClasseighteen =
//     document.getElementById(selectChessItem.indexofChesscheck + 18) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 18)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 18)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasseighteen === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] &&
//     emptyBox[selectChessItem.indexofChesscheck + 18]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
//       "onClick",
//       "makeMove(18)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstTS =
//     document.getElementById(selectChessItem.indexofChesscheck + 27) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 27)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 27)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstTS === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 27] &&
//     emptyBox[selectChessItem.indexofChesscheck + 27]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
//       "onClick",
//       "makeMove(27)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstTSix =
//     document.getElementById(selectChessItem.indexofChesscheck + 36) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 36)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 36)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstTSix === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 36] &&
//     emptyBox[selectChessItem.indexofChesscheck + 36]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
//       "onClick",
//       "makeMove(36)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstFF =
//     document.getElementById(selectChessItem.indexofChesscheck + 45) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 45)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 45)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstFF === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 45] &&
//     emptyBox[selectChessItem.indexofChesscheck + 45]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
//       "onClick",
//       "makeMove(45)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstFFour =
//     document.getElementById(selectChessItem.indexofChesscheck + 54) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 54)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 54)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstFFour === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 54] &&
//     emptyBox[selectChessItem.indexofChesscheck + 54]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 54].setAttribute(
//       "onClick",
//       "makeMove(54)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 54].style.background =
//       "#CA2F1F";
//   }
//   let BQClasstST =
//     document.getElementById(selectChessItem.indexofChesscheck + 63) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 63)
//       .getElementsByTagName("img")
//       .item(0) &&
//     document
//       .getElementById(selectChessItem.indexofChesscheck + 63)
//       .getElementsByTagName("img")
//       .item(0).className;
//   if (
//     BQClasstST === "WHITE_PIECE" &&
//     chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 54] === null &&
//     chessBoard[selectChessItem.indexofChesscheck + 63] &&
//     emptyBox[selectChessItem.indexofChesscheck + 63]
//   ) {
//     emptyBox[selectChessItem.indexofChesscheck + 63].setAttribute(
//       "onClick",
//       "makeMove(63)"
//     );
//     emptyBox[selectChessItem.indexofChesscheck + 63].style.background =
//       "#CA2F1F";
//   }
// }
function isBlackQueen() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "black") {
    return;
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 7] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 14
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    } else if (
      // findIndexOne !=-1 && cornerNumber[findIndexOne]<=selectChessItem.indexofChesscheck+14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 21
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 21 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      // findIndexOne != -1 && cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 28
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 28 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 35
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 35 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 9 &&
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 18 &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 27
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 27 &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 36
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 36 &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 45
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 45 &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 7] === null) {
    let stopSuggetion = false;
    if (
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 14
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    }

    let findIndextwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 21
    );
    if (
      findIndextwo != -1 &&
      cornerNumber[findIndextwo] <= selectChessItem.indexofChesscheck - 21 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 28
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 28 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 35
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 35 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 42
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 42 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 42]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
        "onClick",
        "makeMove(-42)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 42]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
        "onClick",
        "makeMove(-42)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
        "#27AE60";
    }
    let findIndexSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 49
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexSix] <= selectChessItem.indexofChesscheck - 49 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 49] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 49]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
        "onClick",
        "makeMove(-49)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 49] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 49]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
        "onClick",
        "makeMove(-49)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 9 &&
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck - 18 &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 27
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 27 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 36
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 36 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 45
    );

    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 45 &&
      chessBoard[selectChessItem.indexofChesscheck - 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
        "onClick",
        "makeMove(-45)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
        "onClick",
        "makeMove(8)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
        "#27AE60";
      if (
        chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
        emptyBox[selectChessItem.indexofChesscheck + 16]
      ) {
        emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
          "onClick",
          "makeMove(16)"
        );
        emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
          "#27AE60";
        if (
          chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
          emptyBox[selectChessItem.indexofChesscheck + 24]
        ) {
          emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
            "onClick",
            "makeMove(24)"
          );
          emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
            "#27AE60";
          if (
            chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
            emptyBox[selectChessItem.indexofChesscheck + 32]
          ) {
            emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
              "onClick",
              "makeMove(32)"
            );
            emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
              "#27AE60";
          }
        }
      }
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
        "onClick",
        "makeMove(-8)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
        "#27AE60";
      if (
        chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
        emptyBox[selectChessItem.indexofChesscheck - 16]
      ) {
        emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
          "onClick",
          "makeMove(-16)"
        );
        emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
          "#27AE60";
        if (
          chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
          emptyBox[selectChessItem.indexofChesscheck - 24]
        ) {
          emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
            "onClick",
            "makeMove(-24)"
          );
          emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
            "#27AE60";
          if (
            chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
            emptyBox[selectChessItem.indexofChesscheck - 32]
          ) {
            emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
              "onClick",
              "makeMove(-32)"
            );
            emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
              "#27AE60";
            if (
              chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
              emptyBox[selectChessItem.indexofChesscheck - 40]
            ) {
              emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
                "onClick",
                "makeMove(-40)"
              );
              emptyBox[
                selectChessItem.indexofChesscheck - 40
              ].style.background = "#27AE60";
              if (
                chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
                emptyBox[selectChessItem.indexofChesscheck - 48]
              ) {
                emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
                  "onClick",
                  "makeMove(-48)"
                );
                emptyBox[
                  selectChessItem.indexofChesscheck - 48
                ].style.background = "#27AE60";
                if (
                  chessBoard[selectChessItem.indexofChesscheck - 56] === null &&
                  emptyBox[selectChessItem.indexofChesscheck - 56]
                ) {
                  emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
                    "onClick",
                    "makeMove(-56)"
                  );
                  emptyBox[
                    selectChessItem.indexofChesscheck - 56
                  ].style.background = "#27AE60";
                }
              }
            }
          }
        }
      }
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck + 2 &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck + 3 &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck + 4 &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck + 5 &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck + 6 &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
  }

  if (chessBoard[selectChessItem.indexofChesscheck - 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck - 2 &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck - 3 &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck - 4 &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck - 5 &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck - 6 &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck - 7 &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
  }

  let wQClassEight =
    document.getElementById(selectChessItem.indexofChesscheck - 8) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassEight === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#CA2F1F";
  }
  let wQClassPEight =
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPEight === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
  let wQClassSixteen =
    document.getElementById(selectChessItem.indexofChesscheck - 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSixteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] &&
    emptyBox[selectChessItem.indexofChesscheck - 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
      "onClick",
      "makeMove(-16)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
      "#CA2F1F";
  }
  let wQClassPSixteen =
    document.getElementById(selectChessItem.indexofChesscheck + 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPSixteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#CA2F1F";
  }
  let wQClasssixteen =
    document.getElementById(selectChessItem.indexofChesscheck - 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasssixteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] &&
    emptyBox[selectChessItem.indexofChesscheck - 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
      "onClick",
      "makeMove(-24)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
      "#CA2F1F";
  }
  let wQClassPTF =
    document.getElementById(selectChessItem.indexofChesscheck + 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPTF === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#CA2F1F";
  }
  let wQClassTF =
    document.getElementById(selectChessItem.indexofChesscheck - 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTF === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] &&
    emptyBox[selectChessItem.indexofChesscheck - 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
      "onClick",
      "makeMove(-32)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
      "#CA2F1F";
  }
  let wQClassPTT =
    document.getElementById(selectChessItem.indexofChesscheck + 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPTT === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] &&
    emptyBox[selectChessItem.indexofChesscheck + 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
      "onClick",
      "makeMove(32)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
      "#CA2F1F";
  }
  let wQClassFourty =
    document.getElementById(selectChessItem.indexofChesscheck - 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFourty === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] &&
    emptyBox[selectChessItem.indexofChesscheck - 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
      "onClick",
      "makeMove(-40)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 40].style.background =
      "#CA2F1F";
  }
  let wQClassPFourty =
    document.getElementById(selectChessItem.indexofChesscheck + 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFourty === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] &&
    emptyBox[selectChessItem.indexofChesscheck + 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
      "onClick",
      "makeMove(40)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
      "#CA2F1F";
  }
  let wQClassFE =
    document.getElementById(selectChessItem.indexofChesscheck - 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFE === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] &&
    emptyBox[selectChessItem.indexofChesscheck - 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
      "onClick",
      "makeMove(-48)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 48].style.background =
      "#CA2F1F";
  }
  let wQClassPFE =
    document.getElementById(selectChessItem.indexofChesscheck + 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFE === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] &&
    emptyBox[selectChessItem.indexofChesscheck + 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
      "onClick",
      "makeMove(48)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
      "#CA2F1F";
  }
  let wQClassFS =
    document.getElementById(selectChessItem.indexofChesscheck - 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFS === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 56] &&
    emptyBox[selectChessItem.indexofChesscheck - 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
      "onClick",
      "makeMove(-56)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 56].style.background =
      "#CA2F1F";
  }
  let wQClassPFS =
    document.getElementById(selectChessItem.indexofChesscheck + 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFS === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 56] &&
    emptyBox[selectChessItem.indexofChesscheck + 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
      "onClick",
      "makeMove(56)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
      "#CA2F1F";
  }

  let wQClassOne =
    document.getElementById(selectChessItem.indexofChesscheck + 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#CA2F1F";
  }
  let wQClassMinusOne =
    document.getElementById(selectChessItem.indexofChesscheck - 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let wQClassTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] &&
    emptyBox[selectChessItem.indexofChesscheck + 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
      "onClick",
      "makeMove(2)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
      "#CA2F1F";
  }
  let wQClassMinusTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] &&
    emptyBox[selectChessItem.indexofChesscheck - 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
      "onClick",
      "makeMove(-2)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
      "#CA2F1F";
  }
  let WQClassThree =
    document.getElementById(selectChessItem.indexofChesscheck + 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    WQClassThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] &&
    emptyBox[selectChessItem.indexofChesscheck + 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
      "onClick",
      "makeMove(3)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
      "#CA2F1F";
  }
  let WQClassMinusThree =
    document.getElementById(selectChessItem.indexofChesscheck - 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    WQClassMinusThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] &&
    emptyBox[selectChessItem.indexofChesscheck - 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
      "onClick",
      "makeMove(-3)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
      "#CA2F1F";
  }
  let wQClassFour =
    document.getElementById(selectChessItem.indexofChesscheck + 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] &&
    emptyBox[selectChessItem.indexofChesscheck + 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
      "onClick",
      "makeMove(4)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
      "#CA2F1F";
  }
  let wQClassMinusFour =
    document.getElementById(selectChessItem.indexofChesscheck - 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] &&
    emptyBox[selectChessItem.indexofChesscheck - 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
      "onClick",
      "makeMove(-4)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
      "#CA2F1F";
  }
  let wQClassFive =
    document.getElementById(selectChessItem.indexofChesscheck + 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] &&
    emptyBox[selectChessItem.indexofChesscheck + 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
      "onClick",
      "makeMove(5)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
      "#CA2F1F";
  }
  let wQClassMinusFive =
    document.getElementById(selectChessItem.indexofChesscheck - 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] &&
    emptyBox[selectChessItem.indexofChesscheck - 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
      "onClick",
      "makeMove(-5)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
      "#CA2F1F";
  }
  let wQClassSix =
    document.getElementById(selectChessItem.indexofChesscheck + 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#CA2F1F";
  }
  let wQClassMinusSix =
    document.getElementById(selectChessItem.indexofChesscheck - 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let wQClassSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let wQClassminusSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassminusSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let wQClassFourteen =
    document.getElementById(selectChessItem.indexofChesscheck + 14) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFourteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] &&
    emptyBox[selectChessItem.indexofChesscheck + 14]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
      "onClick",
      "makeMove(14)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
      "#CA2F1F";
  }
  let wQClasstOne =
    document.getElementById(selectChessItem.indexofChesscheck + 21) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] &&
    emptyBox[selectChessItem.indexofChesscheck + 21]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
      "onClick",
      "makeMove(21)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
      "#CA2F1F";
  }
  let wQClassTE =
    document.getElementById(selectChessItem.indexofChesscheck + 28) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTE === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] &&
    emptyBox[selectChessItem.indexofChesscheck + 28]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
      "onClick",
      "makeMove(28)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
      "#CA2F1F";
  }
  let wQClasstTF =
    document.getElementById(selectChessItem.indexofChesscheck + 35) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTF === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] &&
    emptyBox[selectChessItem.indexofChesscheck + 35]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
      "onClick",
      "makeMove(35)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
      "#CA2F1F";
  }
  let wQClasstTG =
    document.getElementById(selectChessItem.indexofChesscheck + 42) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 42)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 42)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTG === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 42] &&
    emptyBox[selectChessItem.indexofChesscheck + 42]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 42].setAttribute(
      "onClick",
      "makeMove(42)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 42].style.background =
      "#CA2F1F";
  }
  let wQClasstTH =
    document.getElementById(selectChessItem.indexofChesscheck + 49) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 49)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTH === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 42] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 49] &&
    emptyBox[selectChessItem.indexofChesscheck + 49]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 49].setAttribute(
      "onClick",
      "makeMove(49)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 49].style.background =
      "#CA2F1F";
  }
  let wQMinusSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let wQMinusFourteen =
    document.getElementById(selectChessItem.indexofChesscheck - 14) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 14)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 14)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] &&
    emptyBox[selectChessItem.indexofChesscheck - 14]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
      "onClick",
      "makeMove(-14)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
      "#CA2F1F";
  }
  let wQMinusTwentyOne =
    document.getElementById(selectChessItem.indexofChesscheck - 21) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 21)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 21)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusTwentyOne === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] &&
    emptyBox[selectChessItem.indexofChesscheck - 21]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
      "onClick",
      "makeMove(-21)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
      "#CA2F1F";
  }

  let wQMinusTwentyEight =
    document.getElementById(selectChessItem.indexofChesscheck - 28) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 28)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 28)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusTwentyEight === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] &&
    emptyBox[selectChessItem.indexofChesscheck - 28]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
      "onClick",
      "makeMove(-28)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
      "#CA2F1F";
  }
  let wQMinusThirtyFive =
    document.getElementById(selectChessItem.indexofChesscheck - 35) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 35)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 35)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusThirtyFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] &&
    emptyBox[selectChessItem.indexofChesscheck - 35]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
      "onClick",
      "makeMove(-35)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
      "#CA2F1F";
  }
  let wQMinusFourtyTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 42) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 42)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 42)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourtyTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 42] &&
    emptyBox[selectChessItem.indexofChesscheck - 42]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
      "onClick",
      "makeMove(-42)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
      "#CA2F1F";
  }
  let wQMinusFourtyNine =
    document.getElementById(selectChessItem.indexofChesscheck - 49) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 49)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 49)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourtyNine === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 49] &&
    emptyBox[selectChessItem.indexofChesscheck - 49]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
      "onClick",
      "makeMove(-49)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
      "#CA2F1F";
  }
  let wQClassnine =
    document.getElementById(selectChessItem.indexofChesscheck + 9) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassnine === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#CA2F1F";
  }
  let wQClassMinusNine =
    document.getElementById(selectChessItem.indexofChesscheck - 9) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusNine === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
  let wQClasseighteen =
    document.getElementById(selectChessItem.indexofChesscheck + 18) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 18)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 18)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasseighteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] &&
    emptyBox[selectChessItem.indexofChesscheck + 18]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
      "onClick",
      "makeMove(18)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
      "#CA2F1F";
  }
  let wQClassMinusNighteen =
    document.getElementById(selectChessItem.indexofChesscheck - 18) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusNighteen === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] &&
    emptyBox[selectChessItem.indexofChesscheck - 18]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
      "onClick",
      "makeMove(-18)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
      "#CA2F1F";
  }
  let wQClasstTS =
    document.getElementById(selectChessItem.indexofChesscheck + 27) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 27)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 27)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTS === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] &&
    emptyBox[selectChessItem.indexofChesscheck + 27]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
      "onClick",
      "makeMove(27)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusTS =
    document.getElementById(selectChessItem.indexofChesscheck - 27) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusTS === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] &&
    emptyBox[selectChessItem.indexofChesscheck - 27]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
      "onClick",
      "makeMove(-27)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
      "#CA2F1F";
  }
  let wQClasstTSix =
    document.getElementById(selectChessItem.indexofChesscheck + 36) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 36)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 36)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 36] &&
    emptyBox[selectChessItem.indexofChesscheck + 36]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
      "onClick",
      "makeMove(36)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusTSix =
    document.getElementById(selectChessItem.indexofChesscheck - 36) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusTSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 36] &&
    emptyBox[selectChessItem.indexofChesscheck - 36]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
      "onClick",
      "makeMove(-36)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
      "#CA2F1F";
  }
  let wQClasstFF =
    document.getElementById(selectChessItem.indexofChesscheck + 45) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 45)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 45)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstFF === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 45] &&
    emptyBox[selectChessItem.indexofChesscheck + 45]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
      "onClick",
      "makeMove(45)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusFF =
    document.getElementById(selectChessItem.indexofChesscheck - 45) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 45)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 45)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusFF === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 45] &&
    emptyBox[selectChessItem.indexofChesscheck - 45]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
      "onClick",
      "makeMove(-45)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
      "#CA2F1F";
  }
}

function iswhitePawn() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";

  if (pieceColor != "white") {
    return;
  }

  if (chessBoard[selectChessItem.indexofChesscheck - 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
        "onClick",
        "makeMove(-8)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
        "#27AE60";
    }
    if (
      chessBoard[selectChessItem.indexofChesscheck].isFirstMove == true &&
      chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 16]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
        "onClick",
        "makeMove(-16)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
        "#27AE60";
    }
  }

  let whitePawnOne =
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;

  if (
    whitePawnOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let whitePawnTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whitePawnTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
}

function isWhiteKnight() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "white") {
    return;
  }

  let stopSuggetion = false;
  let wKIndexOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 15
  );
  if (
    wKIndexOne != -1 &&
    cornerNumber[selectChessItem.indexofChesscheck % 2] == 1 &&
    cornerNumber[wKIndexOne] <= selectChessItem.indexofChesscheck + 15 &&
    chessBoard[selectChessItem.indexofChesscheck + 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#27AE60";
  } else if (
    wKIndexOne == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#27AE60";
  }
  let wkIndexTwo = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 17
  );
  if (
    stopSuggetion == false &&
    wkIndexTwo != -1 &&
    selectChessItem.indexofChesscheck <= 8 &&
    cornerNumber[wkIndexTwo] <= selectChessItem.indexofChesscheck + 17 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  } else if (
    wkIndexTwo != -1 &&
    selectChessItem.indexofChesscheck <= 8 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  } else if (
    wkIndexTwo == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
      "onClick",
      "makeMove(17)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
      "#27AE60";
  }
  let wkIndexThree = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 6
  );

  if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    selectChessItem.indexofChesscheck % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree != -1 &&
    (selectChessItem.indexofChesscheck + 6) % 2 == 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexThree == -1 &&
    (!cornerNumber.includes(selectChessItem.indexofChesscheck) ||
      selectChessItem.indexofChesscheck % 2 != 0) &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#27AE60";
  }
  let wkIndexFour = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck + 10
  );

  if (
    stopSuggetion == false &&
    wkIndexFour != -1 &&
    cornerNumber[wkIndexFour] <= selectChessItem.indexofChesscheck + 10 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );

    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    wkIndexFour == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == true &&
    wkIndexFour == -1 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#27AE60";
  }

  let wKIndexMinusOne = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 15
  );
  if (
    wKIndexMinusOne != -1 &&
    cornerNumber[wKIndexMinusOne] <= selectChessItem.indexofChesscheck - 15 &&
    chessBoard[selectChessItem.indexofChesscheck - 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#27AE60";
  } else if (
    chessBoard[selectChessItem.indexofChesscheck - 15] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#27AE60";
  }

  let wkIndexMinusTwo = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 17
  );

  if (
    stopSuggetion == false &&
    wkIndexMinusTwo != -1 &&
    cornerNumber[wkIndexMinusTwo] <= selectChessItem.indexofChesscheck + 17 &&
    chessBoard[selectChessItem.indexofChesscheck - 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
      "onClick",
      "makeMove(-17)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusTwo == -1 &&
    chessBoard[selectChessItem.indexofChesscheck - 17] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
      "onClick",
      "makeMove(-17)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
      "#27AE60";
  }

  let wkIndexMinusThree = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 6
  );

  if (
    stopSuggetion == false &&
    wkIndexMinusThree != -1 &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree == -1 &&
    stopSuggetion == false &&
    selectChessItem.indexofChesscheck % 2 == 0 &&
    cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree == -1 &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree != -1 &&
    stopSuggetion == true &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck) &&
    (selectChessItem.indexofChesscheck - 6) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusThree != -1 &&
    stopSuggetion == false &&
    cornerNumber.includes(selectChessItem.indexofChesscheck - 6) &&
    (selectChessItem.indexofChesscheck - 6) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#27AE60";
  }

  let wkIndexMinusFour = cornerNumber.findIndex(
    (item) => item == selectChessItem.indexofChesscheck - 10
  );

  if (
    stopSuggetion == false &&
    wkIndexMinusFour != -1 &&
    cornerNumber[wkIndexMinusFour] <= selectChessItem.indexofChesscheck - 10 &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    stopSuggetion = true;
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  } else if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  } else if (
    wkIndexMinusFour == -1 &&
    stopSuggetion == true &&
    chessBoard[selectChessItem.indexofChesscheck - 10] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#27AE60";
  }

  let classOne =
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 6] &&
    emptyBox[selectChessItem.indexofChesscheck + 6] &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck)
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#CA2F1F";
  }
  let classTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck + 10)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 10)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classTwo === "BLACK_PIECE" &&
    cornerNumber.includes(selectChessItem.indexofChesscheck + 10) &&
    (selectChessItem.indexofChesscheck + 10) % 2 != 0 &&
    chessBoard[selectChessItem.indexofChesscheck + 10] &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#CA2F1F";
  } else if (
    classTwo === "BLACK_PIECE" &&
    !cornerNumber.includes(selectChessItem.indexofChesscheck + 10) &&
    chessBoard[selectChessItem.indexofChesscheck + 10] &&
    emptyBox[selectChessItem.indexofChesscheck + 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 10].setAttribute(
      "onClick",
      "makeMove(10)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 10].style.background =
      "#CA2F1F";
  }
  let classThree =
    document
      .getElementById(selectChessItem.indexofChesscheck + 15)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 15)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 15] &&
    emptyBox[selectChessItem.indexofChesscheck + 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 15].setAttribute(
      "onClick",
      "makeMove(15)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 15].style.background =
      "#CA2F1F";
  }
  let classFour =
    document
      .getElementById(selectChessItem.indexofChesscheck + 17)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 17)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 17] &&
    emptyBox[selectChessItem.indexofChesscheck + 17]
  ) {
    if (
      !(
        selectChessItem.indexofChesscheck % 2 != 0 &&
        cornerNumber.includes(selectChessItem.indexofChesscheck)
      )
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 17].setAttribute(
        "onClick",
        "makeMove(17)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 17].style.background =
        "#CA2F1F";
    }
  }

  let classFive =
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let classSix =
    document
      .getElementById(selectChessItem.indexofChesscheck - 10)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 10)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 10] &&
    emptyBox[selectChessItem.indexofChesscheck - 10]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 10].setAttribute(
      "onClick",
      "makeMove(-10)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 10].style.background =
      "#CA2F1F";
  }
  let classSeven =
    document
      .getElementById(selectChessItem.indexofChesscheck - 15)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 15)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 15] &&
    emptyBox[selectChessItem.indexofChesscheck - 15]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 15].setAttribute(
      "onClick",
      "makeMove(-15)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 15].style.background =
      "#CA2F1F";
  }
  let classEight =
    document
      .getElementById(selectChessItem.indexofChesscheck - 17)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 17)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classEight === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 17] &&
    emptyBox[selectChessItem.indexofChesscheck - 17]
  ) {
    if (
      !(
        selectChessItem.indexofChesscheck % 2 != 0 &&
        cornerNumber.includes(selectChessItem.indexofChesscheck)
      )
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 17].setAttribute(
        "onClick",
        "makeMove(-17)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 17].style.background =
        "#CA2F1F";
    }
  }
}

function isWhiteBishop() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "white") {
    return;
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 7] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 14
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    } else if (
      // findIndexOne !=-1 && cornerNumber[findIndexOne]<=selectChessItem.indexofChesscheck+14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 21
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 21 &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      // findIndexOne != -1 && cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 28
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 28 &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 35
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 35 &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 9 &&
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 18 &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 27
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 27 &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 36
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 36 &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 45
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 45 &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 7] === null) {
    let stopSuggetion = false;
    if (
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 14
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    }

    let findIndextwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 21
    );
    if (
      findIndextwo != -1 &&
      cornerNumber[findIndextwo] <= selectChessItem.indexofChesscheck - 21 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 28
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 28 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 35
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 35 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 9 &&
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck - 18 &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 27
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 27 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 36
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 36 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 45
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 45 &&
      chessBoard[selectChessItem.indexofChesscheck - 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
        "onClick",
        "makeMove(-45)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
        "#27AE60";
    }
  }
  let classOne =
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7]
  ) {
    let classOne =
      document
        .getElementById(selectChessItem.indexofChesscheck - 7)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck - 7)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classOne === "BLACK_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck - 7] &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#CA2F1F";
    }
    let classTwo =
      document
        .getElementById(selectChessItem.indexofChesscheck - 14)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck - 14)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classTwo === "BLACK_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck - 14] &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#CA2F1F";
    }
    let classThree =
      document
        .getElementById(selectChessItem.indexofChesscheck - 21)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck - 21)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classThree === "BLACK_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck - 21] &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#CA2F1F";
    }
    let classFour =
      document
        .getElementById(selectChessItem.indexofChesscheck - 28)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck - 28)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classFour === "BLACK_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck - 28] &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#CA2F1F";
    }
    let classFive =
      document
        .getElementById(selectChessItem.indexofChesscheck - 35)
        .getElementsByTagName("img")
        .item(0) &&
      document
        .getElementById(selectChessItem.indexofChesscheck - 35)
        .getElementsByTagName("img")
        .item(0).className;
    if (
      classFive === "BLACK_PIECE" &&
      chessBoard[selectChessItem.indexofChesscheck - 35] &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#CA2F1F";
    }
  }
  let classSix =
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
  let classSeven =
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 18] &&
    emptyBox[selectChessItem.indexofChesscheck - 18]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
      "onClick",
      "makeMove(-18)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
      "#CA2F1F";
  }
  let classEight =
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classEight === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 27] &&
    emptyBox[selectChessItem.indexofChesscheck - 27]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
      "onClick",
      "makeMove(-27)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
      "#CA2F1F";
  }
  let classNine =
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    classNine === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 36] &&
    emptyBox[selectChessItem.indexofChesscheck - 36]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
      "onClick",
      "makeMove(-36)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
      "#CA2F1F";
  }
}

function isWhiteRook() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "white") {
    return;
  }
  let stopSuggetion = false;
  let whiteMRookone =
    document.getElementById(selectChessItem.indexofChesscheck - 8) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookone === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#27AE60";
  }
  let whiteMRookTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookTwo === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
      "onClick",
      "makeMove(-16)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
      "#27AE60";
  }
  let whiteMRookThree =
    document.getElementById(selectChessItem.indexofChesscheck - 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookThree === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
      "onClick",
      "makeMove(-24)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
      "#27AE60";
  }
  let whiteMRookFour =
    document.getElementById(selectChessItem.indexofChesscheck - 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookFour === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
      "onClick",
      "makeMove(-32)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
      "#27AE60";
  }
  let whiteMRookFive =
    document.getElementById(selectChessItem.indexofChesscheck - 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookFive === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
      "onClick",
      "makeMove(-40)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 40].style.background =
      "#27AE60";
  }
  let whiteMRookSix =
    document.getElementById(selectChessItem.indexofChesscheck - 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookSix === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
      "onClick",
      "makeMove(-48)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 48].style.background =
      "#27AE60";
  }

  let whiteMRookSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    whiteMRookSeven === "WHITE_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 56]
  ) {
    stopSuggetion = true;
  }
  if (
    stopSuggetion == false &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 56] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
      "onClick",
      "makeMove(-56)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 56].style.background =
      "#27AE60";
  }

  // let disableSuggetion=false
  //   let whiteClassOne =document.getElementById(selectChessItem.indexofChesscheck + 8).getElementsByTagName('img').item(0)&&
  //     document.getElementById(selectChessItem.indexofChesscheck + 8).getElementsByTagName('img').item(0).className
  //   if (whiteClassOne==="WHITE_PIECE"&&chessBoard[selectChessItem.indexofChesscheck + 8]) {
  //     disableSuggetion = true
  //     disableSuggetion==false&&
  //   }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#27AE60";
  }
  // let whiteClassTwo =document.getElementById(selectChessItem.indexofChesscheck + 16).getElementsByTagName('img').item(0)&&
  //   document.getElementById(selectChessItem.indexofChesscheck + 16).getElementsByTagName('img').item(0).className
  // if (whiteClassTwo==="WHITE_PIECE"&&chessBoard[selectChessItem.indexofChesscheck + 16]) {
  //   disableSuggetion = true
  //   disableSuggetion==false&&
  // }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#27AE60";
    if (
      chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 32]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
        "onClick",
        "makeMove(32)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
        "#27AE60";

      if (
        chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
        emptyBox[selectChessItem.indexofChesscheck + 40]
      ) {
        emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
          "onClick",
          "makeMove(40)"
        );
        emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
          "#27AE60";

        if (
          chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
          emptyBox[selectChessItem.indexofChesscheck + 48]
        ) {
          emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
            "onClick",
            "makeMove(48)"
          );
          emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
            "#27AE60";
          if (
            chessBoard[selectChessItem.indexofChesscheck + 56] === null &&
            emptyBox[selectChessItem.indexofChesscheck + 56]
          ) {
            emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
              "onClick",
              "makeMove(56)"
            );
            emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
              "#27AE60";
          }
        }
      }
    }
  }

  if (chessBoard[selectChessItem.indexofChesscheck + 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck + 2 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck + 3 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck + 4 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck + 5 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );

      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck + 6 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
  }

  if (chessBoard[selectChessItem.indexofChesscheck - 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck - 1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck - 2 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck - 3 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 4
    );

    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck - 4 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck - 5 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck - 6 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck - 7 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
  }

  let rookOne =
    document.getElementById(selectChessItem.indexofChesscheck + 8) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
  let rookTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#CA2F1F";
  }
  let rookThree =
    document.getElementById(selectChessItem.indexofChesscheck + 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#CA2F1F";
  }
  let rookFour =
    document.getElementById(selectChessItem.indexofChesscheck + 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] &&
    emptyBox[selectChessItem.indexofChesscheck + 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
      "onClick",
      "makeMove(32)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
      "#CA2F1F";
  }
  let rookFive =
    document.getElementById(selectChessItem.indexofChesscheck + 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img") &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] &&
    emptyBox[selectChessItem.indexofChesscheck + 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
      "onClick",
      "makeMove(40)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
      "#CA2F1F";
  }
  let rookSix =
    document.getElementById(selectChessItem.indexofChesscheck + 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img") &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] &&
    emptyBox[selectChessItem.indexofChesscheck + 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
      "onClick",
      "makeMove(48)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
      "#CA2F1F";
  }
  let rookSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img") &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 56] &&
    emptyBox[selectChessItem.indexofChesscheck + 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
      "onClick",
      "makeMove(56)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
      "#CA2F1F";
  }
  let BROne =
    document.getElementById(selectChessItem.indexofChesscheck - 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BROne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let BRTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] &&
    emptyBox[selectChessItem.indexofChesscheck - 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
      "onClick",
      "makeMove(-2)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
      "#CA2F1F";
  }
  let BRThree =
    document.getElementById(selectChessItem.indexofChesscheck - 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] &&
    emptyBox[selectChessItem.indexofChesscheck - 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
      "onClick",
      "makeMove(-3)"
    );

    emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
      "#CA2F1F";
  }
  let BRFour =
    document.getElementById(selectChessItem.indexofChesscheck - 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] &&
    emptyBox[selectChessItem.indexofChesscheck - 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
      "onClick",
      "makeMove(-4)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
      "#CA2F1F";
  }
  let BRFive =
    document.getElementById(selectChessItem.indexofChesscheck - 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] &&
    emptyBox[selectChessItem.indexofChesscheck - 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
      "onClick",
      "makeMove(-5)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
      "#CA2F1F";
  }
  let BRSix =
    document.getElementById(selectChessItem.indexofChesscheck - 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let BRSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    BRSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let rookClassOne =
    document.getElementById(selectChessItem.indexofChesscheck + 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#CA2F1F";
  }
  let rookClassTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] &&
    emptyBox[selectChessItem.indexofChesscheck + 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
      "onClick",
      "makeMove(2)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
      "#CA2F1F";
  }
  let rookClassThree =
    document.getElementById(selectChessItem.indexofChesscheck + 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] &&
    emptyBox[selectChessItem.indexofChesscheck + 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
      "onClick",
      "makeMove(3)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
      "#CA2F1F";
  }
  let rookClassFour =
    document.getElementById(selectChessItem.indexofChesscheck + 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] &&
    emptyBox[selectChessItem.indexofChesscheck + 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
      "onClick",
      "makeMove(4)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
      "#CA2F1F";
  }
  let rookClassFive =
    document.getElementById(selectChessItem.indexofChesscheck + 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] &&
    emptyBox[selectChessItem.indexofChesscheck + 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
      "onClick",
      "makeMove(5)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
      "#CA2F1F";
  }
  let rookClassSix =
    document.getElementById(selectChessItem.indexofChesscheck + 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#CA2F1F";
  }
  let rookClassSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    rookClassSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
}

function isWhiteKing() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "white") {
    return;
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#27AE60";
  }
  if (
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#27AE60";
  }

  if (
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#27AE60";
  }
  let wKingOne =
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let wKingTwo =
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let wKingThree =
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#CA2F1F";
  }
  let wKingFour =
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
  let wKingFive =
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#CA2F1F";
  }
  let wKingSix =
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let wKingSeven =
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wKingSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
}

function isWhiteQueen() {
  document.getElementById(selectChessItem.indexofChesscheck).style.background =
    "#BBCB2B";
  if (pieceColor != "white") {
    return;
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 7] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 14
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    } else if (
      // findIndexOne !=-1 && cornerNumber[findIndexOne]<=selectChessItem.indexofChesscheck+14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
        "onClick",
        "makeMove(14)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 21
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 21 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      // findIndexOne != -1 && cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 14 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
        "onClick",
        "makeMove(21)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 28
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 28 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
        "onClick",
        "makeMove(28)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 35
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 35 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
        "onClick",
        "makeMove(35)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck + 9 &&
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
        "onClick",
        "makeMove(9)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck + 18 &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
        "onClick",
        "makeMove(18)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 27
    );
    if (
      stopSuggetion == false &&
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck + 27 &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
        "onClick",
        "makeMove(27)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 36
    );
    if (
      stopSuggetion == false &&
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck + 36 &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
        "onClick",
        "makeMove(36)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 45
    );
    if (
      stopSuggetion == false &&
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck + 45 &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
        "onClick",
        "makeMove(45)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 7] === null) {
    let stopSuggetion = false;
    if (
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 14
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 14 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 14]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
        "onClick",
        "makeMove(-14)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
        "#27AE60";
    }

    let findIndextwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 21
    );
    if (
      findIndextwo != -1 &&
      cornerNumber[findIndextwo] <= selectChessItem.indexofChesscheck - 21 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 21]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
        "onClick",
        "makeMove(-21)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 28
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 28 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 28]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
        "onClick",
        "makeMove(-28)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 35
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 35 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 35]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
        "onClick",
        "makeMove(-35)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 42
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 42 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 42]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
        "onClick",
        "makeMove(-42)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 42]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
        "onClick",
        "makeMove(-42)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
        "#27AE60";
    }
    let findIndexSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 49
    );
    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexSix] <= selectChessItem.indexofChesscheck - 49 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 49] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 49]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
        "onClick",
        "makeMove(-49)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
      chessBoard[selectChessItem.indexofChesscheck - 49] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 49]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
        "onClick",
        "makeMove(-49)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 9] === null) {
    let stopSuggetion = false;
    let findIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 9
    );
    if (
      findIndexOne != -1 &&
      cornerNumber[findIndexOne] <= selectChessItem.indexofChesscheck - 9 &&
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 9]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
        "onClick",
        "makeMove(-9)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
        "#27AE60";
    }
    let findIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 18
    );
    if (
      stopSuggetion == false &&
      findIndexTwo != -1 &&
      cornerNumber[findIndexTwo] <= selectChessItem.indexofChesscheck - 18 &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 18]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
        "onClick",
        "makeMove(-18)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
        "#27AE60";
    }
    let findIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 27
    );
    if (
      findIndexThree != -1 &&
      cornerNumber[findIndexThree] <= selectChessItem.indexofChesscheck - 27 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 27]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
        "onClick",
        "makeMove(-27)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
        "#27AE60";
    }
    let findIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 36
    );
    if (
      findIndexFour != -1 &&
      cornerNumber[findIndexFour] <= selectChessItem.indexofChesscheck - 36 &&
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 36]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
        "onClick",
        "makeMove(-36)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
        "#27AE60";
    }
    let findIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 45
    );

    if (
      findIndexFive != -1 &&
      cornerNumber[findIndexFive] <= selectChessItem.indexofChesscheck - 45 &&
      chessBoard[selectChessItem.indexofChesscheck - 45] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 45]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
        "onClick",
        "makeMove(-45)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
        "#27AE60";
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
        "onClick",
        "makeMove(8)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
        "#27AE60";
      if (
        chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
        emptyBox[selectChessItem.indexofChesscheck + 16]
      ) {
        emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
          "onClick",
          "makeMove(16)"
        );
        emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
          "#27AE60";
        if (
          chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
          emptyBox[selectChessItem.indexofChesscheck + 24]
        ) {
          emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
            "onClick",
            "makeMove(24)"
          );
          emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
            "#27AE60";
          if (
            chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
            emptyBox[selectChessItem.indexofChesscheck + 32]
          ) {
            emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
              "onClick",
              "makeMove(32)"
            );
            emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
              "#27AE60";
          }
        }
      }
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck - 8] === null) {
    if (
      chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 8]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
        "onClick",
        "makeMove(-8)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
        "#27AE60";
      if (
        chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
        emptyBox[selectChessItem.indexofChesscheck - 16]
      ) {
        emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
          "onClick",
          "makeMove(-16)"
        );
        emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
          "#27AE60";
        if (
          chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
          emptyBox[selectChessItem.indexofChesscheck - 24]
        ) {
          emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
            "onClick",
            "makeMove(-24)"
          );
          emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
            "#27AE60";
          if (
            chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
            emptyBox[selectChessItem.indexofChesscheck - 32]
          ) {
            emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
              "onClick",
              "makeMove(-32)"
            );
            emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
              "#27AE60";
            if (
              chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
              emptyBox[selectChessItem.indexofChesscheck - 40]
            ) {
              emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
                "onClick",
                "makeMove(-40)"
              );
              emptyBox[
                selectChessItem.indexofChesscheck - 40
              ].style.background = "#27AE60";
              if (
                chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
                emptyBox[selectChessItem.indexofChesscheck - 48]
              ) {
                emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
                  "onClick",
                  "makeMove(-48)"
                );
                emptyBox[
                  selectChessItem.indexofChesscheck - 48
                ].style.background = "#27AE60";
                if (
                  chessBoard[selectChessItem.indexofChesscheck - 56] === null &&
                  emptyBox[selectChessItem.indexofChesscheck - 56]
                ) {
                  emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
                    "onClick",
                    "makeMove(-56)"
                  );
                  emptyBox[
                    selectChessItem.indexofChesscheck - 56
                  ].style.background = "#27AE60";
                }
              }
            }
          }
        }
      }
    }
  }
  if (chessBoard[selectChessItem.indexofChesscheck + 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
        "onClick",
        "makeMove(1)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck + 2 &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
        "onClick",
        "makeMove(2)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck + 3 &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
        "onClick",
        "makeMove(3)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck + 4 &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
        "onClick",
        "makeMove(4)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck + 5 &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
        "onClick",
        "makeMove(5)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck + 6 &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
        "onClick",
        "makeMove(6)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck + 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck + 7 &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck + 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
        "onClick",
        "makeMove(7)"
      );
      emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
        "#27AE60";
    }
  }

  if (chessBoard[selectChessItem.indexofChesscheck - 1] === null) {
    let stopSuggetion = false;
    let rookIndexOne = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 1
    );
    if (
      rookIndexOne != -1 &&
      cornerNumber[rookIndexOne] <= selectChessItem.indexofChesscheck + 1 &&
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    } else if (
      chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 1]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
        "onClick",
        "makeMove(-1)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
        "#27AE60";
    }
    let rookIndexTwo = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 2
    );
    if (
      stopSuggetion == false &&
      rookIndexTwo != -1 &&
      cornerNumber[rookIndexTwo] <= selectChessItem.indexofChesscheck - 2 &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 2]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
        "onClick",
        "makeMove(-2)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
        "#27AE60";
    }
    let rookIndexThree = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 3
    );
    if (
      stopSuggetion == false &&
      rookIndexThree != -1 &&
      cornerNumber[rookIndexThree] <= selectChessItem.indexofChesscheck - 3 &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 3]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
        "onClick",
        "makeMove(-3)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
        "#27AE60";
    }
    let rookIndexFour = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 4
    );
    if (
      stopSuggetion == false &&
      rookIndexFour != -1 &&
      cornerNumber[rookIndexFour] <= selectChessItem.indexofChesscheck - 4 &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 4]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
        "onClick",
        "makeMove(-4)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
        "#27AE60";
    }
    let rookIndexFive = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 5
    );
    if (
      stopSuggetion == false &&
      rookIndexFive != -1 &&
      cornerNumber[rookIndexFive] <= selectChessItem.indexofChesscheck - 5 &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 5]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
        "onClick",
        "makeMove(-5)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
        "#27AE60";
    }
    let rookIndexFSix = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 6
    );
    if (
      stopSuggetion == false &&
      rookIndexFSix != -1 &&
      cornerNumber[rookIndexFSix] <= selectChessItem.indexofChesscheck - 6 &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 6]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
        "onClick",
        "makeMove(-6)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
        "#27AE60";
    }
    let rookIndexFSeven = cornerNumber.findIndex(
      (item) => item == selectChessItem.indexofChesscheck - 7
    );
    if (
      stopSuggetion == false &&
      rookIndexFSeven != -1 &&
      cornerNumber[rookIndexFSeven] <= selectChessItem.indexofChesscheck - 7 &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      stopSuggetion = true;
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    } else if (
      stopSuggetion == false &&
      chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
      emptyBox[selectChessItem.indexofChesscheck - 7]
    ) {
      emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
        "onClick",
        "makeMove(-7)"
      );
      emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
        "#27AE60";
    }
  }

  let wQClassEight =
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassEight === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] &&
    emptyBox[selectChessItem.indexofChesscheck - 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 8].setAttribute(
      "onClick",
      "makeMove(-8)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 8].style.background =
      "#CA2F1F";
  }
  let wQClassPEight =
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 8)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPEight === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] &&
    emptyBox[selectChessItem.indexofChesscheck + 8]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 8].setAttribute(
      "onClick",
      "makeMove(8)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 8].style.background =
      "#CA2F1F";
  }
  let wQClassSixteen =
    document.getElementById(selectChessItem.indexofChesscheck - 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSixteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] &&
    emptyBox[selectChessItem.indexofChesscheck - 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 16].setAttribute(
      "onClick",
      "makeMove(-16)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 16].style.background =
      "#CA2F1F";
  }
  let wQClassPSixteen =
    document.getElementById(selectChessItem.indexofChesscheck + 16) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 16)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPSixteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] &&
    emptyBox[selectChessItem.indexofChesscheck + 16]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 16].setAttribute(
      "onClick",
      "makeMove(16)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 16].style.background =
      "#CA2F1F";
  }
  let wQClasssixteen =
    document.getElementById(selectChessItem.indexofChesscheck - 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasssixteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] &&
    emptyBox[selectChessItem.indexofChesscheck - 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 24].setAttribute(
      "onClick",
      "makeMove(-24)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 24].style.background =
      "#CA2F1F";
  }
  let wQClassPTF =
    document.getElementById(selectChessItem.indexofChesscheck + 24) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 24)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPTF === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] &&
    emptyBox[selectChessItem.indexofChesscheck + 24]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 24].setAttribute(
      "onClick",
      "makeMove(24)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 24].style.background =
      "#CA2F1F";
  }
  let wQClassTF =
    document.getElementById(selectChessItem.indexofChesscheck - 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTF === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] &&
    emptyBox[selectChessItem.indexofChesscheck - 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 32].setAttribute(
      "onClick",
      "makeMove(-32)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 32].style.background =
      "#CA2F1F";
  }
  let wQClassPTT =
    document.getElementById(selectChessItem.indexofChesscheck + 32) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 32)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPTT === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] &&
    emptyBox[selectChessItem.indexofChesscheck + 32]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 32].setAttribute(
      "onClick",
      "makeMove(32)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 32].style.background =
      "#CA2F1F";
  }
  let wQClassFourty =
    document.getElementById(selectChessItem.indexofChesscheck - 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFourty === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] &&
    emptyBox[selectChessItem.indexofChesscheck - 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 40].setAttribute(
      "onClick",
      "makeMove(-40)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 40].style.background =
      "#CA2F1F";
  }
  let wQClassPFourty =
    document.getElementById(selectChessItem.indexofChesscheck + 40) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 40)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFourty === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] &&
    emptyBox[selectChessItem.indexofChesscheck + 40]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 40].setAttribute(
      "onClick",
      "makeMove(40)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 40].style.background =
      "#CA2F1F";
  }
  let wQClassFE =
    document.getElementById(selectChessItem.indexofChesscheck - 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFE === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] &&
    emptyBox[selectChessItem.indexofChesscheck - 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 48].setAttribute(
      "onClick",
      "makeMove(-48)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 48].style.background =
      "#CA2F1F";
  }
  let wQClassPFE =
    document.getElementById(selectChessItem.indexofChesscheck + 48) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 48)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFE === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] &&
    emptyBox[selectChessItem.indexofChesscheck + 48]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 48].setAttribute(
      "onClick",
      "makeMove(48)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 48].style.background =
      "#CA2F1F";
  }
  let wQClassFS =
    document.getElementById(selectChessItem.indexofChesscheck - 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFS === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 56] &&
    emptyBox[selectChessItem.indexofChesscheck - 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 56].setAttribute(
      "onClick",
      "makeMove(-56)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 56].style.background =
      "#CA2F1F";
  }
  let wQClassPFS =
    document.getElementById(selectChessItem.indexofChesscheck + 56) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 56)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassPFS === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 8] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 16] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 24] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 32] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 40] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 48] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 56] &&
    emptyBox[selectChessItem.indexofChesscheck + 56]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 56].setAttribute(
      "onClick",
      "makeMove(56)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 56].style.background =
      "#CA2F1F";
  }

  let wQClassOne =
    document.getElementById(selectChessItem.indexofChesscheck + 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] &&
    emptyBox[selectChessItem.indexofChesscheck + 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 1].setAttribute(
      "onClick",
      "makeMove(1)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 1].style.background =
      "#CA2F1F";
  }
  let wQClassMinusOne =
    document.getElementById(selectChessItem.indexofChesscheck - 1) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 1)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] &&
    emptyBox[selectChessItem.indexofChesscheck - 1]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 1].setAttribute(
      "onClick",
      "makeMove(-1)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 1].style.background =
      "#CA2F1F";
  }
  let wQClassTwo =
    document.getElementById(selectChessItem.indexofChesscheck + 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] &&
    emptyBox[selectChessItem.indexofChesscheck + 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 2].setAttribute(
      "onClick",
      "makeMove(2)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 2].style.background =
      "#CA2F1F";
  }
  let wQClassMinusTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 2) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 2)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] &&
    emptyBox[selectChessItem.indexofChesscheck - 2]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 2].setAttribute(
      "onClick",
      "makeMove(-2)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 2].style.background =
      "#CA2F1F";
  }
  let WQClassThree =
    document.getElementById(selectChessItem.indexofChesscheck + 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    WQClassThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] &&
    emptyBox[selectChessItem.indexofChesscheck + 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 3].setAttribute(
      "onClick",
      "makeMove(3)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 3].style.background =
      "#CA2F1F";
  }
  let WQClassMinusThree =
    document.getElementById(selectChessItem.indexofChesscheck - 3) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 3)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    WQClassMinusThree === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] &&
    emptyBox[selectChessItem.indexofChesscheck - 3]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 3].setAttribute(
      "onClick",
      "makeMove(-3)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 3].style.background =
      "#CA2F1F";
  }
  let wQClassFour =
    document.getElementById(selectChessItem.indexofChesscheck + 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] &&
    emptyBox[selectChessItem.indexofChesscheck + 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 4].setAttribute(
      "onClick",
      "makeMove(4)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 4].style.background =
      "#CA2F1F";
  }
  let wQClassMinusFour =
    document.getElementById(selectChessItem.indexofChesscheck - 4) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 4)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusFour === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] &&
    emptyBox[selectChessItem.indexofChesscheck - 4]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 4].setAttribute(
      "onClick",
      "makeMove(-4)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 4].style.background =
      "#CA2F1F";
  }
  let wQClassFive =
    document.getElementById(selectChessItem.indexofChesscheck + 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] &&
    emptyBox[selectChessItem.indexofChesscheck + 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 5].setAttribute(
      "onClick",
      "makeMove(5)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 5].style.background =
      "#CA2F1F";
  }
  let wQClassMinusFive =
    document.getElementById(selectChessItem.indexofChesscheck - 5) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 5)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] &&
    emptyBox[selectChessItem.indexofChesscheck - 5]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 5].setAttribute(
      "onClick",
      "makeMove(-5)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 5].style.background =
      "#CA2F1F";
  }
  let wQClassSix =
    document.getElementById(selectChessItem.indexofChesscheck + 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] &&
    emptyBox[selectChessItem.indexofChesscheck + 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 6].setAttribute(
      "onClick",
      "makeMove(6)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 6].style.background =
      "#CA2F1F";
  }
  let wQClassMinusSix =
    document.getElementById(selectChessItem.indexofChesscheck - 6) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 6)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] &&
    emptyBox[selectChessItem.indexofChesscheck - 6]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 6].setAttribute(
      "onClick",
      "makeMove(-6)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 6].style.background =
      "#CA2F1F";
  }
  let wQClassSeven =
    document.getElementById(selectChessItem.indexofChesscheck + 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 7] &&
    emptyBox[selectChessItem.indexofChesscheck + 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 7].setAttribute(
      "onClick",
      "makeMove(7)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 7].style.background =
      "#CA2F1F";
  }
  let wQClassminusSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassminusSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 1] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 2] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 3] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 4] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 5] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 6] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let wQClassFourteen =
    document.getElementById(selectChessItem.indexofChesscheck + 14) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 14)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassFourteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] &&
    emptyBox[selectChessItem.indexofChesscheck + 14]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 14].setAttribute(
      "onClick",
      "makeMove(14)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 14].style.background =
      "#CA2F1F";
  }
  let wQClasstOne =
    document.getElementById(selectChessItem.indexofChesscheck + 21) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 21)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] &&
    emptyBox[selectChessItem.indexofChesscheck + 21]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 21].setAttribute(
      "onClick",
      "makeMove(21)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 21].style.background =
      "#CA2F1F";
  }
  let wQClassTE =
    document.getElementById(selectChessItem.indexofChesscheck + 28) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 28)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassTE === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] &&
    emptyBox[selectChessItem.indexofChesscheck + 28]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 28].setAttribute(
      "onClick",
      "makeMove(28)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 28].style.background =
      "#CA2F1F";
  }
  let wQClasstTF =
    document.getElementById(selectChessItem.indexofChesscheck + 35) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 35)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTF === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] &&
    emptyBox[selectChessItem.indexofChesscheck + 35]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 35].setAttribute(
      "onClick",
      "makeMove(35)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 35].style.background =
      "#CA2F1F";
  }
  let wQClasstTG =
    document.getElementById(selectChessItem.indexofChesscheck + 42) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 42)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTG === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 42] &&
    emptyBox[selectChessItem.indexofChesscheck + 42]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 42].setAttribute(
      "onClick",
      "makeMove(42)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 42].style.background =
      "#CA2F1F";
  }
  let wQClasstTH =
    document.getElementById(selectChessItem.indexofChesscheck + 49) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 49)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTH === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 42] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 49] &&
    emptyBox[selectChessItem.indexofChesscheck + 49]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 49].setAttribute(
      "onClick",
      "makeMove(49)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 49].style.background =
      "#CA2F1F";
  }
  let wQMinusSeven =
    document.getElementById(selectChessItem.indexofChesscheck - 7) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 7)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusSeven === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] &&
    emptyBox[selectChessItem.indexofChesscheck - 7]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 7].setAttribute(
      "onClick",
      "makeMove(-7)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 7].style.background =
      "#CA2F1F";
  }
  let wQMinusFourteen =
    document.getElementById(selectChessItem.indexofChesscheck - 14) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 14)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 14)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] &&
    emptyBox[selectChessItem.indexofChesscheck - 14]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 14].setAttribute(
      "onClick",
      "makeMove(-14)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 14].style.background =
      "#CA2F1F";
  }
  let wQMinusTwentyOne =
    document.getElementById(selectChessItem.indexofChesscheck - 21) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 21)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 21)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusTwentyOne === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] &&
    emptyBox[selectChessItem.indexofChesscheck - 21]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 21].setAttribute(
      "onClick",
      "makeMove(-21)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 21].style.background =
      "#CA2F1F";
  }

  let wQMinusTwentyEight =
    document.getElementById(selectChessItem.indexofChesscheck - 28) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 28)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 28)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusTwentyEight === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] &&
    emptyBox[selectChessItem.indexofChesscheck - 28]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 28].setAttribute(
      "onClick",
      "makeMove(-28)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 28].style.background =
      "#CA2F1F";
  }
  let wQMinusThirtyFive =
    document.getElementById(selectChessItem.indexofChesscheck - 35) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 35)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 35)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusThirtyFive === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] &&
    emptyBox[selectChessItem.indexofChesscheck - 35]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 35].setAttribute(
      "onClick",
      "makeMove(-35)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 35].style.background =
      "#CA2F1F";
  }
  let wQMinusFourtyTwo =
    document.getElementById(selectChessItem.indexofChesscheck - 42) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 42)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 42)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourtyTwo === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 42] &&
    emptyBox[selectChessItem.indexofChesscheck - 42]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 42].setAttribute(
      "onClick",
      "makeMove(-42)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 42].style.background =
      "#CA2F1F";
  }
  let wQMinusFourtyNine =
    document.getElementById(selectChessItem.indexofChesscheck - 49) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 49)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 49)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQMinusFourtyNine === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 7] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 14] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 21] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 28] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 35] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 42] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 49] &&
    emptyBox[selectChessItem.indexofChesscheck - 49]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 49].setAttribute(
      "onClick",
      "makeMove(-49)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 49].style.background =
      "#CA2F1F";
  }
  let wQClassnine =
    document.getElementById(selectChessItem.indexofChesscheck + 9) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassnine === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] &&
    emptyBox[selectChessItem.indexofChesscheck + 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 9].setAttribute(
      "onClick",
      "makeMove(9)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 9].style.background =
      "#CA2F1F";
  }
  let wQClassMinusNine =
    document.getElementById(selectChessItem.indexofChesscheck - 9) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 9)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusNine === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] &&
    emptyBox[selectChessItem.indexofChesscheck - 9]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 9].setAttribute(
      "onClick",
      "makeMove(-9)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 9].style.background =
      "#CA2F1F";
  }
  let wQClasseighteen =
    document.getElementById(selectChessItem.indexofChesscheck + 18) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 18)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 18)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasseighteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] &&
    emptyBox[selectChessItem.indexofChesscheck + 18]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 18].setAttribute(
      "onClick",
      "makeMove(18)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 18].style.background =
      "#CA2F1F";
  }
  let wQClassMinusNighteen =
    document.getElementById(selectChessItem.indexofChesscheck - 18) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 18)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClassMinusNighteen === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] &&
    emptyBox[selectChessItem.indexofChesscheck - 18]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 18].setAttribute(
      "onClick",
      "makeMove(-18)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 18].style.background =
      "#CA2F1F";
  }
  let wQClasstTS =
    document.getElementById(selectChessItem.indexofChesscheck + 27) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 27)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 27)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTS === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] &&
    emptyBox[selectChessItem.indexofChesscheck + 27]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 27].setAttribute(
      "onClick",
      "makeMove(27)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 27].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusTS =
    document.getElementById(selectChessItem.indexofChesscheck - 27) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 27)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusTS === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] &&
    emptyBox[selectChessItem.indexofChesscheck - 27]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 27].setAttribute(
      "onClick",
      "makeMove(-27)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 27].style.background =
      "#CA2F1F";
  }
  let wQClasstTSix =
    document.getElementById(selectChessItem.indexofChesscheck + 36) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 36)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 36)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstTSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 36] &&
    emptyBox[selectChessItem.indexofChesscheck + 36]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 36].setAttribute(
      "onClick",
      "makeMove(36)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 36].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusTSix =
    document.getElementById(selectChessItem.indexofChesscheck - 36) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 36)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusTSix === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 36] &&
    emptyBox[selectChessItem.indexofChesscheck - 36]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 36].setAttribute(
      "onClick",
      "makeMove(-36)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 36].style.background =
      "#CA2F1F";
  }
  let wQClasstFF =
    document.getElementById(selectChessItem.indexofChesscheck + 45) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 45)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + 45)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstFF === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck + 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 36] === null &&
    chessBoard[selectChessItem.indexofChesscheck + 45] &&
    emptyBox[selectChessItem.indexofChesscheck + 45]
  ) {
    emptyBox[selectChessItem.indexofChesscheck + 45].setAttribute(
      "onClick",
      "makeMove(45)"
    );
    emptyBox[selectChessItem.indexofChesscheck + 45].style.background =
      "#CA2F1F";
  }
  let wQClasstMinusFF =
    document.getElementById(selectChessItem.indexofChesscheck - 45) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 45)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck - 45)
      .getElementsByTagName("img")
      .item(0).className;
  if (
    wQClasstMinusFF === "BLACK_PIECE" &&
    chessBoard[selectChessItem.indexofChesscheck - 9] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 18] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 27] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 36] === null &&
    chessBoard[selectChessItem.indexofChesscheck - 45] &&
    emptyBox[selectChessItem.indexofChesscheck - 45]
  ) {
    emptyBox[selectChessItem.indexofChesscheck - 45].setAttribute(
      "onClick",
      "makeMove(-45)"
    );
    emptyBox[selectChessItem.indexofChesscheck - 45].style.background =
      "#CA2F1F";
  }
}

function makeMove(number) {
  killPieceId =
    document
      .getElementById(selectChessItem.indexofChesscheck + number)
      .getElementsByTagName("img")
      .item(0) &&
    document
      .getElementById(selectChessItem.indexofChesscheck + number)
      .getElementsByTagName("img")
      .item(0).id;

  console.log("make move=======", number, killPieceId);
  sendToSocket(socket, {
    eventName: "MOVE_PIECES",
    data: {
      emptyBox,
      pieceId: clickId,
      selectChessItem: selectChessItem,
      number: number,
      killPieceId,
      className,
    },
  });

  clearInterval(turnDownTimerInterval);
  clearInterval(movePiecesInterval);
  // turnDownTimer = 10;
  // counterVal = 10;
}

function updateChessData(indexofChesscheck, modifyIndex, removeChess, clickId) {
  chessBoard[indexofChesscheck] = null;
  let piceId = emptyBox[removeChess].id;

  console.log("update chess data called.............");
  if (removeChess) {
    chessBoard[removeChess] = null;
  }
  chessBoard[modifyIndex] = { id: +piceId, name: clickId, isFirstMove: false };
  sendToSocket(socket, {
    eventName: "UPDATE_PIECES",
    data: {
      chessBoard: chessBoard,
    },
  });
}

function movePieces(data) {
  turnDownTimer = 10;
  clearInterval(movePiecesInterval);
  movePiecesInterval = setInterval(() => {
    if (turnDownTimer == 0) {
      clearInterval(movePiecesInterval);
      return;
    } else {
      console.log("======================turnDownTIme", turnDownTimer);
      // console.log("====================counterVal", counterVal);
      document.getElementById("turnTimer").innerHTML = turnDownTimer;
      turnDownTimer--;
    }
  }, 1000);

  gameData = data;
  console.log("message gameData==========", gameData);
  document.getElementById("turnMessage").innerHTML = gameData.turnMessage;
  selectChessItem = gameData.selectChessItem;
  className = gameData.className;
  if (data.pieceId) {
    imageSrc = document.getElementById(gameData.pieceId).src;
    emptyBox[selectChessItem.indexofChesscheck + gameData.number].setAttribute(
      "onClick",
      `chessClick(${selectChessItem.indexofChesscheck + gameData.number})`
    );
    emptyBox[
      selectChessItem.indexofChesscheck + gameData.number
    ].innerHTML = `<img  src="${imageSrc}" Class="${className}" id="${gameData.pieceId}">`;
    emptyBox[selectChessItem.indexofChesscheck].innerHTML = " ";
  }

  if (gameData.killPieceId === "BLACK_KING") {
    if (pieceColor == "white") {
      let winnerData = {
        eventName: "WIN",
        data: {
          tableId: sessionStorage.getItem("tableId"),
          pieceColor,
        },
      };
      sendToSocket(socket, winnerData);
    }
  } else if (gameData.killPieceId === "WHITE_KING") {
    if (pieceColor == "black") {
      let winnerData = {
        eventName: "WIN",
        data: {
          tableId: sessionStorage.getItem("tableId"),
          pieceColor,
        },
      };
      sendToSocket(socket, winnerData);
    }
    // alert(`Black player is winner!!`);
    // setTimeout(() => {
    //   location.reload();
    // }, 2000);
  }
  resetClick();

  if (gameData.nextTurn == userId) {
    document.getElementById("maindiv").style.pointerEvents = "";
  } else {
    document.getElementById("maindiv").style.pointerEvents = "none";
  }

  indexofChesscheck = selectChessItem.indexofChesscheck;

  updateChessData(
    indexofChesscheck,
    indexofChesscheck + gameData.number,
    indexofChesscheck + gameData.number,
    gameData.pieceId
  );
}

function updatePieces(data) {
  console.log("data >>", data);
  gameData = data;
  if (data.currentTurn == sessionUserId) {
    document.getElementById("maindiv").style.pointerEvents = "";
  }
}

function rejoinGame({ tableData, remainTime }) {
  document.getElementById("chess_button").disabled = true;
  leaveBtn.style.display = "block";
  gameData = tableData;
  chessBoard = tableData.board;

  let turnDownTimer = remainTime;
  turnDownTimerInterval = setInterval(() => {
    var timerVal = turnDownTimer--;

    if (timerVal > 0) {
      document.getElementById("turnTimer").innerHTML = timerVal;
    } else {
      clearInterval(turnDownTimerInterval);
    }
  }, 1000);

  if (tableData.currentTurn == sessionUserId) {
    document.getElementById("maindiv").style.pointerEvents = "";
  }
  // Turn Message
  tableData.playerInfo.forEach((player) => {
    if (player._id == tableData.currentTurn) {
      document.getElementById(
        "turnMessage"
      ).innerText = `${player.playername} Turn`;
    }
    if (player._id == sessionUserId) {
      pieceColor = player.pieceColor;
      document.getElementById("playerName").innerHTML = player.playername;
    }
  });

  let tdElements = document.querySelectorAll("td");
  tdElements.forEach((el) => {
    if (el.innerHTML !== "") {
      el.innerHTML = "";
    }
  });
  chessBoard.forEach((piece) => {
    if (piece && piece.name) {
      let tdId = piece.id;
      let tdElement = document.getElementById(tdId);
      if (piece.name == "BLACK_ROOK_1") {
        tdElement.innerHTML = `<img
        src="./images/pieces/black/black_rook.png"
        class="BLACK_PIECE"
        id="BLACK_ROOK_1"
      />`;
      } else if (piece.name == "BLACK_KNIGHT_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_knight.png"
        id="BLACK_KNIGHT_1"
      />`;
      } else if (piece.name == "BLACK_BISHOP_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_bishop.png"
        id="BLACK_BISHOP_1"
      />`;
      } else if (piece.name == "BLACK_QUREEN") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_queen.png"
        id="BLACK_QUREEN_1"
      />`;
      } else if (piece.name == "BLACK_KING") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_king.png"
        id="BLACK_KING"
      />`;
      } else if (piece.name == "BLACK_BISHOP_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_bishop.png"
        id="BLACK_BISHOP_2"
      />`;
      } else if (piece.name == "BLACK_KNIGHT_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_knight.png"
        id="BLACK_KNIGHT_2"
      />`;
      } else if (piece.name == "BLACK_ROOK_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_rook.png"
        id="BLACK_ROOK_2"
      />`;
      } else if (piece.name == "BLACK_PAWN_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_1"
      />`;
      } else if (piece.name == "BLACK_PAWN_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_2"
      />`;
      } else if (piece.name == "BLACK_PAWN_3") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_3"
      />`;
      } else if (piece.name == "BLACK_PAWN_4") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_4"
      />`;
      } else if (piece.name == "BLACK_PAWN_5") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_5"
      />`;
      } else if (piece.name == "BLACK_PAWN_6") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_6"
      />`;
      } else if (piece.name == "BLACK_PAWN_7") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_7"
      />`;
      } else if (piece.name == "BLACK_PAWN_8") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_8"
      />`;
      } else if (piece.name == "WHITE_PAWN_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_1"
      />`;
      } else if (piece.name == "WHITE_PAWN_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_2"
      />`;
      } else if (piece.name == "WHITE_PAWN_3") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_3"
      />`;
      } else if (piece.name == "WHITE_PAWN_4") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_4"
      />`;
      } else if (piece.name == "WHITE_PAWN_5") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_5"
      />`;
      } else if (piece.name == "WHITE_PAWN_6") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_6"
      />`;
      } else if (piece.name == "WHITE_PAWN_7") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_7"
      />`;
      } else if (piece.name == "WHITE_PAWN_8") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_8"
      />`;
      } else if (piece.name == "WHITE_ROOK_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_rook.png"
        id="WHITE_ROOK_1"
      />`;
      } else if (piece.name == "WHITE_KNIGHT_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_knight.png"
        id="WHITE_KNIGHT_1"
      />`;
      } else if (piece.name == "WHITE_BISHOP_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_bishop.png"
        id="WHITE_BISHOP_1"
      />`;
      } else if (piece.name == "WHITE_QUREEN") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_queen.png"
        id="WHITE_QUREEN"
      />`;
      } else if (piece.name == "WHITE_KING") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_king.png"
        id="WHITE_KING"
      />`;
      } else if (piece.name == "WHITE_BISHOP_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_bishop.png"
        id="WHITE_BISHOP_2"
      />`;
      } else if (piece.name == "WHITE_KNIGHT_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_knight.png"
        id="WHITE_KNIGHT_2"
      />`;
      } else if (piece.name == "WHITE_ROOK_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_rook.png"
        id="WHITE_ROOK_2"
      />`;
      }
    }
  });
}

function winGame(data) {
  document.getElementById("turnTimer").style.display = "none";
  if (sessionStorage.getItem("userId") == data.winnerId) {
    alert("You Win the Game!!");
  } else {
    alert("You loose game!!");
  }

  setTimeout(() => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("tableId");
    sessionStorage.removeItem("id");
    location.reload();
  }, 2000);
}

function leaveTable(data) {
  alert(data.message);
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("tableId");
  sessionStorage.removeItem("id");
  location.reload();
}

function gameStarted() {
  leaveBtn.disabled = false;
  let turnDownTimer = 10;
  turnDownTimerInterval = setInterval(() => {
    let timerGameStart = turnDownTimer--;

    if (timerGameStart > 0) {
      document.getElementById("turnTimer").innerHTML = timerGameStart;
    } else {
      clearInterval(turnDownTimerInterval);
    }
  }, 1000);
}

function leaveUserBeforeLockIn(data) {
  sessionUserId = sessionStorage.getItem("userId");
  sessionTableId = sessionStorage.getItem("tableId");

  console.log("sessionUserId >>", sessionUserId);
  console.log("sessionTableId >>", sessionTableId);

  if (sessionUserId !== data.playerInfo[0]._id) {
    alert("You left the table!");
    sessionStorage.removeItem("tableId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("id");
    location.reload();
    return;
  } else {
    alert("Opponent has left the table!");
    clearInterval(roundTimeInterval);

    document.getElementById("roundTimer").innerHTML = "";
    document.getElementById("maindiv").style.pointerEvents = "none";

    gameData = {
      playerInfo: data.playerInfo,
      board: data.board,
      pieceColor: data.pieceColor,
      tableId: data._id,
    };

    chessBoard = gameData.board;
    tableId = gameData.tableId;
    sessionStorage.setItem("tableId", tableId);
    document.getElementById("chess_button").disabled = true;
    leaveBtn.style.display = "block";
    pieceColor = gameData.pieceColor;

    if (gameData.playerInfo.length < 2) {
      document.getElementById("turnMessage").innerText =
        "Waiting for other player";
      playerSocket = gameData.playerInfo[0].socketId;

      userId = gameData.playerInfo[0]._id;
      sessionStorage.setItem("userId", gameData.playerInfo[0]._id);
    }
    sessionStorage.setItem(
      "id",
      gameData.playerInfo[gameData.playerInfo.length - 1].socketId
    );
  }
}

function botMove(data) {
  console.log("DATA ::", data);
  clearInterval(movePiecesInterval);

  gameData = data.tableData;
  chessBoard = data.tableData.board;

  let tdElements = document.querySelectorAll("td");
  tdElements.forEach((el) => {
    if (el.innerHTML !== "") {
      el.innerHTML = "";
    }
  });
  data.tableData.board.forEach((piece) => {
    if (piece && piece.name) {
      let tdId = piece.id;
      let tdElement = document.getElementById(tdId);
      console.log(tdElement);
      if (piece.name == "BLACK_ROOK_1") {
        tdElement.innerHTML = `<img
        src="./images/pieces/black/black_rook.png"
        class="BLACK_PIECE"
        id="BLACK_ROOK_1"
      />`;
      } else if (piece.name == "BLACK_KNIGHT_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_knight.png"
        id="BLACK_KNIGHT_1"
      />`;
      } else if (piece.name == "BLACK_BISHOP_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_bishop.png"
        id="BLACK_BISHOP_1"
      />`;
      } else if (piece.name == "BLACK_QUREEN") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_queen.png"
        id="BLACK_QUREEN_1"
      />`;
      } else if (piece.name == "BLACK_KING") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_king.png"
        id="BLACK_KING"
      />`;
      } else if (piece.name == "BLACK_BISHOP_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_bishop.png"
        id="BLACK_BISHOP_2"
      />`;
      } else if (piece.name == "BLACK_KNIGHT_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_knight.png"
        id="BLACK_KNIGHT_2"
      />`;
      } else if (piece.name == "BLACK_ROOK_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_rook.png"
        id="BLACK_ROOK_2"
      />`;
      } else if (piece.name == "BLACK_PAWN_1") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_1"
      />`;
      } else if (piece.name == "BLACK_PAWN_2") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_2"
      />`;
      } else if (piece.name == "BLACK_PAWN_3") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_3"
      />`;
      } else if (piece.name == "BLACK_PAWN_4") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_4"
      />`;
      } else if (piece.name == "BLACK_PAWN_5") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_5"
      />`;
      } else if (piece.name == "BLACK_PAWN_6") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_6"
      />`;
      } else if (piece.name == "BLACK_PAWN_7") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_7"
      />`;
      } else if (piece.name == "BLACK_PAWN_8") {
        tdElement.innerHTML = `<img
        class="BLACK_PIECE"
        src="images/pieces/black/black_pawn.png"
        id="BLACK_PAWN_8"
      />`;
      } else if (piece.name == "WHITE_PAWN_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_1"
      />`;
      } else if (piece.name == "WHITE_PAWN_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_2"
      />`;
      } else if (piece.name == "WHITE_PAWN_3") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_3"
      />`;
      } else if (piece.name == "WHITE_PAWN_4") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_4"
      />`;
      } else if (piece.name == "WHITE_PAWN_5") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_5"
      />`;
      } else if (piece.name == "WHITE_PAWN_6") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_6"
      />`;
      } else if (piece.name == "WHITE_PAWN_7") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_7"
      />`;
      } else if (piece.name == "WHITE_PAWN_8") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_pawn.png"
        id="WHITE_PAWN_8"
      />`;
      } else if (piece.name == "WHITE_ROOK_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_rook.png"
        id="WHITE_ROOK_1"
      />`;
      } else if (piece.name == "WHITE_KNIGHT_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_knight.png"
        id="WHITE_KNIGHT_1"
      />`;
      } else if (piece.name == "WHITE_BISHOP_1") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_bishop.png"
        id="WHITE_BISHOP_1"
      />`;
      } else if (piece.name == "WHITE_QUREEN") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_queen.png"
        id="WHITE_QUREEN"
      />`;
      } else if (piece.name == "WHITE_KING") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_king.png"
        id="WHITE_KING"
      />`;
      } else if (piece.name == "WHITE_BISHOP_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_bishop.png"
        id="WHITE_BISHOP_2"
      />`;
      } else if (piece.name == "WHITE_KNIGHT_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_knight.png"
        id="WHITE_KNIGHT_2"
      />`;
      } else if (piece.name == "WHITE_ROOK_2") {
        tdElement.innerHTML = `<img
        class="WHITE_PIECE"
        src="images/pieces/white/white_rook.png"
        id="WHITE_ROOK_2"
      />`;
      }
    }
  });

  let turnDownTimer = 10;
  turnDownTimerInterval = setInterval(() => {
    var timerVal = turnDownTimer--;

    if (timerVal > 0) {
      document.getElementById("turnTimer").innerHTML = timerVal;
    } else {
      clearInterval(turnDownTimerInterval);
    }
  }, 1000);

  document.getElementById("maindiv").style.pointerEvents = "";
}

function botUpdatePieces(data) {
  // Turn Message
  document.getElementById("turnMessage").innerText = `${data.turnMessage}`;
}

function botWin(data) {
  document.getElementById("turnTimer").style.display = "none";
  alert(data.message);

  setTimeout(() => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("tableId");
    sessionStorage.removeItem("id");
    location.reload();
  }, 2000);
}

function eventLockInFun() {
  leaveBtn.disabled = true;
}

function eventHandler(socket) {
  socket.onAny((eventName, data) => {
    console.log(
      `REQUEST EVENT NAME: ${eventName}, REQUEST DATA: ${JSON.stringify(
        data.data
      )}`
    );

    switch (eventName) {
      case "JOIN":
        Join(data.data);
        break;
      case "START":
        Start(data.data);
        break;
      case "MOVE_PIECES":
        movePieces(data.data);
        break;
      case "UPDATE_PIECES":
        updatePieces(data.data);
        break;
      case "REJOIN":
        rejoinGame(data.data);
        break;
      case "WIN":
        winGame(data.data);
        break;
      case "LEAVE_TABLE":
        leaveTable(data.data);
        break;
      case "GAME_STARTED":
        gameStarted(data.data);
        break;
      case "EVENT_LOCK_IN":
        eventLockInFun();
        break;
      case "LEAVE_USER_BEFORE_LOCK_IN":
        leaveUserBeforeLockIn(data.data);
        break;
      case "BOT_MOVE_PIECES":
        botMove(data.data);
        break;
      case "BOT_UPDATE_PIECES":
        botUpdatePieces(data.data);
        break;
      case "BOT_WIN":
        botWin(data.data);
        break;
    }
  });
}
