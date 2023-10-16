"use client";

import React, { useEffect } from "react";
import useMessageStore from "../store/messages.store";
import { ChannelWithMessages } from "../data";
import { Messages } from "./messages";
import { SendMessage } from "./send-message";

const Chat = ({ channel }: { channel: ChannelWithMessages }) => {
  // set messages state in the store
  useEffect(() => {
    useMessageStore.setState({ messages: channel.messages });
  }, [channel.messages]);

  return (
    <>
      <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
        <Messages />
      </div>
      <div className="sticky bottom-0 w-full p-8 border-t">
        <SendMessage />
      </div>
    </>
  );
};

export { Chat };
