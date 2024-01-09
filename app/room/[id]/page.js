"use client";
import { useEffect, useContext, useState } from "react";
import { calculateResults } from "./actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SocketContext } from "@/context/SocketContext";
import PlayerOne from "@/components/PlayerOne";
import PlayerTwo from "@/components/PlayerTwo";
import Controls from "@/components/Controls";
import vs_img from "@/public/images/vs.png";
import win_img from "@/public/images/win.png";
import lose_img from "@/public/images/lose.png";
import boom_img from "@/public/images/boom.png";
import styles from "./styles.module.css";

const Room = () => {
  const [result, setResult] = useState({
    rotate: 0,
    show: false,
    reset: false,
  });
  const [resultText, setResultText] = useState("");
  const { socket, rooms, player_1, player_2, router } =
    useContext(SocketContext);

  const pathname = usePathname();

  useEffect(() => {
    let roomId = pathname.split("/")[2];
    let size = Object.keys(socket).length;

    if (size > 0) {
      socket.emit("room:join", { roomId }, (err, room) => {
        if (err) router.push("/");
        // APPEL SMART CONTRACT POUR MISER SUR LA PARTIE
      });
    }
  }, [socket]);

  useEffect(() => {
    const updateResults = async () => {
      const resultData = await calculateResults(rooms, player_1, player_2);
      console.log(resultData);
      if (resultData) {
        // Mettre à jour l'état avec les résultats
        rooms.players[player_1].score = resultData.score[0];
        console.log(rooms.players[player_1].score);
        rooms.players[player_2].score = resultData.score[1];
        let roomsData = resultData.updateRoom;
        await performAnimation(resultData.text);

        rooms.players[player_1].option = null;
        rooms.players[player_2].option = null;
        rooms.players[player_1].optionLock = false;
        rooms.players[player_2].optionLock = false;

        socket.emit("room:update", rooms);

        rooms.players[player_1].option = null;
        rooms.players[player_2].option = null;
        rooms.players[player_1].optionLock = false;
        rooms.players[player_2].optionLock = false;
      }
    };
    updateResults();
  }, [player_1, player_2, rooms, socket]);

  const performAnimation = async (text) => {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let i = 0; i <= 8; i++) {
      if (i === 7) {
        setResult({ rotate: 0, show: true, reset: false });
        setResultText(text);
        await timer(2000);
      } else if (i % 2 === 0 && i < 7) {
        setResult({ rotate: 10, show: false, reset: false });
        await timer(200);
      } else if (i === 8) {
        setResult({ rotate: 0, show: false, reset: true });
        setResultText("");
      } else {
        setResult({ rotate: -10, show: false, reset: false });
        await timer(200);
      }
    }

    return Promise.resolve();
  };

  return (
    <>
      <Image src={vs_img} alt="vs" className={styles.background_img} />
      <PlayerOne result={result} />
      <PlayerTwo result={result} />
      {player_2 && <Controls />}
      {resultText === "win" && (
        <Image src={win_img} alt="win_img" className={styles.win_img} />
      )}
      {resultText === "lose" && (
        <Image src={lose_img} alt="lose_img" className={styles.lose_img} />
      )}
      {resultText === "tie" && (
        <Image src={boom_img} alt="boom_img" className={styles.boom_img} />
      )}
    </>
  );
};

export default Room;
