"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "./message";
import { Button } from "../components/ui/button";
import { Messages } from "./messages";
import useMessageStore from "../store/messages.store";
import { Input } from "./ui/input";

const SERVER_URL = "http://localhost:4000";

interface Channel {
  id: string;
  name: string;
  description: string;
  messages: Message[];
}

const Chat = ({ channel }: { channel: Channel }) => {
  // set messages state in the store
  useMessageStore.setState({ messages: channel.messages });
  const addMessage = useMessageStore((state) => state.addMessage);

  // initialize socket connection
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    // Initialize socket connection when component mounts
    const socketInstance = io(SERVER_URL);

    socketInstance.on("connect", () => {
      console.log("Connected to the server");

      socketInstance.on("new_message", (message: Message) => {
        addMessage(message);
      });
    });

    // Set socket state
    setSocket(socketInstance);

    // Clean up the socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, [addMessage]);

  const handleButtonClick = () => {
    if (socket) {
      socket.emit("send_message", {
        text: "Hello from the React client!",
        user: {
          id: `700`,
          firstName: `John`,
          lastName: `Doe`,
        },
      });
    }
  };

  return (
    <>
      <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
        <Messages />
      </div>
      <div className="sticky bottom-0 w-full p-8 border-t">
        {/* Fixed content at the bottom */}
        <div className="flex w-full items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" onClick={handleButtonClick}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export { Chat };
