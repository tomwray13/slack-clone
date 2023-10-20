"use client";

import React, { useEffect } from "react";
import useMessageStore from "../store/messages.store";
import { ChannelWithMessages } from "../data";
import { Messages } from "./messages";
import { SendMessage } from "./send-message";
import useSocketStore from "../store/socket.store";

const Chat = ({ channel }: { channel: ChannelWithMessages }) => {
  useEffect(() => {
    useMessageStore.setState({ messages: channel.messages });
  }, [channel.messages]);

  const initializeSocket = useSocketStore((state) => state.initializeSocket);
  const socket = useSocketStore((state) => state.socket);
  const webSocketServer = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  useEffect(() => {
    initializeSocket(webSocketServer);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  });

  return (
    <>
      <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
        <Messages />
      </div>
      <div className="sticky bottom-0 w-full p-8 border-t">
        <SendMessage channelId={channel.id} />
      </div>
    </>
  );
};

export { Chat };
