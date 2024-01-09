"use server";

export const calculateResults = async (room, player_1, player_2) => {
  const players = room?.players;
  if (
    players &&
    players[player_1]?.optionLock === true &&
    players[player_2]?.optionLock === true
  ) {
    let result = { score: [0, 0], text: "tie" };
    if (players[player_1].option !== players[player_2].option) {
      result = validateOptions(
        `${players[player_1].option} ${players[player_2].option}`
      );
    }

    room.players[player_1].score += result.score[0];
    room.players[player_2].score += result.score[1];

    return {
      score: [room.players[player_1].score, room.players[player_2].score],
      text: result.text,
      updateRoom: room,
    };
  }
};

const validateOptions = (value) => {
  switch (value) {
    case "rock paper":
      return { score: [0, 1], text: "lose" };
    case "paper scissors":
      return { score: [0, 1], text: "lose" };
    case "scissors rock":
      return { score: [0, 1], text: "lose" };
    case "paper rock":
      return { score: [1, 0], text: "win" };
    case "scissors paper":
      return { score: [1, 0], text: "win" };
    case "rock scissors":
      return { score: [1, 0], text: "win" };
    default:
      return { score: [0, 0], text: "tie" };
  }
};
