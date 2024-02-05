import { joinTable } from "../playing";

const botSignUp = async () => {
  const botData = {
    playername: "Bot",
    socketId: "fakeSocketId",
    turn: true,
    isBot: true,
  };

  console.log(botData);
  joinTable(botData, botData.socketId);
};

export default botSignUp;
