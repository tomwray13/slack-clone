import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "../components/ui/button";

const SERVER_URL = "http://localhost:4000";

const WebSocket: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection when component mounts
    const socketInstance = io(SERVER_URL);

    socketInstance.on("connect", () => {
      console.log("Connected to the server");

      socketInstance.on("events", (data: string) => {
        console.log(`Received from server: ${data}`);
      });
    });

    // Set socket state
    setSocket(socketInstance);

    // Clean up the socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    if (socket) {
      socket.emit("events", "Hello from the React client!");
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Click me</Button>
    </div>
  );
};

export default WebSocket;
