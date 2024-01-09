"use server";

export const handlePlayerChoice = async (room, playerId, choice) => {
  const validOptions = ["rock", "paper", "scissors"];
  if (!validOptions.includes(choice)) {
    throw new Error("Invalid choice");
  }

  const player = room.players[playerId];
  if (!player) {
    throw new Error("Player not found");
  }

  // Mettre à jour le choix et le verrouillage de l'option du joueur
  player.option = choice;
  player.optionLock = true;

  return room;
};
