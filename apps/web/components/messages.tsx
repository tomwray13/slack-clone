"use client";

import useMessageStore from "../store/messages.store";
import { Message } from "./message";

const Messages = () => {
  const messages = useMessageStore((state) => state.messages);
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
};

export { Messages };
