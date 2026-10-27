import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { io } from "socket.io-client";

export function useSocket(roomId) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    if (!token) return undefined;

    const socket = io(
      import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3001",
      { auth: { token } }
    );
    socketRef.current = socket;

    const onMessage = (message) => {
      setMessages((previous) => [...previous, message]);
    };

    socket.on("chat:message", onMessage);
    socket.emit("room:join", roomId);

    return () => {
      socket.off("chat:message", onMessage);
      socket.disconnect();
      if (socketRef.current === socket) socketRef.current = null;
    };
  }, [token, roomId]);

  const sendMessage = useCallback((text) => {
    socketRef.current?.emit("chat:message", { roomId, text });
  }, [roomId]);

  return { messages, sendMessage };
}
