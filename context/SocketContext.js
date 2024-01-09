"use client";
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState({});
  const [rooms, setRoom] = useState({});
  const [player_1, setPlayer_1] = useState("");
  const [player_2, setPlayer_2] = useState("");
  const router = useRouter();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_REACT_APP_SOCKET_URL);
    setSocket(socket);

    socket.on("room:get", (payload) => {
      setRoom(payload);
      let play_1 = Object.keys(payload.players)[0];
      let play_2 = Object.keys(payload.players)[1];

      if (play_1 === socket.id) {
        setPlayer_1(play_1);
        setPlayer_2(play_2);
      } else {
        setPlayer_1(play_2);
        setPlayer_2(play_1);
      }

      if (
        payload?.players[play_1]?.score === 3 ||
        payload?.players[play_2]?.score === 3
      ) {
        let pathname = "/result";
        if (pathname !== router.pathname) router.push(pathname);
      }
      console.log(payload.players);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        rooms,
        setRoom,
        redirect,
        player_1,
        player_2,
        router,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
