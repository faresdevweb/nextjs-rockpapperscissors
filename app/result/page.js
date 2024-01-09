"use client";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "@/context/SocketContext";
import Button from "@/components/Button";
import Image from "next/image";
import win_background_img from "@/public/images/win_background.png";
import rock_left_hand_img from "@/public/images/rock_left_hand.png";
import scissors_right_hand_img from "@/public/images/scissors_right_hand.png";
import win_board_img from "@/public/images/win_board.png";
import lose_board_1_img from "@/public/images/lose_board_1.png";
import lose_board_2_img from "@/public/images/lose_board_2.png";
import lose_board_3_img from "@/public/images/lose_board_3.png";
import styles from "./styles.module.css";

const Result = () => {
  const [boardImg, setBoardImg] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const { rooms, player_1 } = useContext(SocketContext);

  useEffect(() => {
    let score = rooms.players[player_1].score;

    console.log(score);

    if (score === 3) setResultMessage("You Win");
    else setResultMessage("You Loose");
  }, []);

  return (
    <div>
      <div className={styles.result_message_container}>
        <h1 className={styles.result_message}>{resultMessage}</h1>
      </div>
      <div className={styles.container}>
        <Image
          src={win_background_img}
          alt="win_background_img"
          className={styles.background}
        />
        <Image
          src={rock_left_hand_img}
          alt="rock_left_hand_img"
          className={styles.rock_hand}
        />
        <Image
          src={scissors_right_hand_img}
          alt="scissors_right_hand_img"
          className={styles.scissors_hand}
        />
        <div className={styles.btn_container}>
          <Button name="play with friend" type="friend" />
          <Button name="Play with stranger" type="stranger" />
        </div>
      </div>
    </div>
  );
};

export default Result;
