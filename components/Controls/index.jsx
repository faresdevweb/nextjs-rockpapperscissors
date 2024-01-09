import { useState, useContext, useEffect } from "react";
import { handlePlayerChoice } from "./actions";
import Image from "next/image";
import { SocketContext } from "@/context/SocketContext";
import rock_right_hand_img from "@/public/images/rock_right_hand.png";
import paper_right_hand_img from "@/public/images/paper_right_hand.png";
import scissors_right_hand_img from "@/public/images/scissors_right_hand.png";
import styles from "./styles.module.css";

function Controls() {
  const [option, setOption] = useState("");
  const { socket, rooms } = useContext(SocketContext);

  useEffect(() => {
    if (rooms.players[socket.id].optionLock) {
      setOption(rooms.players[socket.id].option);
    } else {
      setOption("");
    }
  }, [rooms]);

  const handleChange = async ({ currentTarget: input }) => {
    setOption(input.value);
    try {
      // Appel au serveur pour traiter le choix
      const updatedRoom = await handlePlayerChoice(rooms, socket.id, input.value);
      socket.emit("room:update", updatedRoom);
    } catch (error) {
      console.error("Erreur lors du traitement du choix du joueur", error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        disabled={rooms.players[socket.id].optionLock}
        className={
          option === "rock"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="rock"
      >
        <Image
          src={rock_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={rooms.players[socket.id].optionLock}
        className={
          option === "paper"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="paper"
      >
        <Image
          src={paper_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={rooms.players[socket.id].optionLock}
        className={
          option === "scissors"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        value="scissors"
      >
        <Image
          src={scissors_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
    </div>
  );
}

export default Controls;