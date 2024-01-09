"use client";
import { useContext } from "react";
import { SocketContext } from "@/context/SocketContext";
import styles from "./styles.module.css";

const Button = ({ name, type }) => {
  const { socket, router } = useContext(SocketContext);

  const handleChange = (type) => {
    socket.emit("room:create", { type }, (err, roomId) => {
      console.log(err, roomId);
      router.push(`/room/${roomId}`);
    });
  };

  return (
    <button className={styles.btn} onClick={() => handleChange(type)}>
      {name}
    </button>
  );
};

export default Button;