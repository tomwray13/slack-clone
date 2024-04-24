import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addMessage, addMessages } from "../store/messages";
import { useGetChannelQuery } from "../store/api";

export const Chat = ({ channelId }: { channelId: number }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { data: messages } = useSelector((state: RootState) => state.messages);
  const {
    data: channel,
    isFetching,
    isError,
  } = useGetChannelQuery(channelId, { skip: !channelId });

  useEffect(() => {
    if (channel) {
      dispatch(addMessages(channel.data.messages));
    }
  }, [channelId, channel, dispatch]);

  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-red-50",
  ];
  const getColor = (userId: number) => colors[userId % colors.length];

  const [newMessage, setNewMessage] = useState<string>(``);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage || !user) {
      throw new Error(`Unable to send message`);
    }
    console.log(`USER`, user);
    dispatch(
      addMessage({ content: newMessage, channelId: channelId, user: user })
    );
    setNewMessage(``);
  };
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching channel</div>;
  }
  return (
    <main className="col-span-3 bg-white">
      {channel && (
        <div className="h-screen flex flex-col">
          <div className="sticky top-0 w-full p-8 border-b">
            <h1 className="font-bold text-xl mb-2">#{channel.data.name}</h1>
          </div>
          <div className="overflow-y-auto flex-grow p-8 flex flex-col-reverse space-y-reverse space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`w-4/5 ${
                  user && message.user.id === user.id
                    ? "self-start"
                    : "self-end"
                }`}
              >
                <div
                  className={`rounded-lg py-2 px-4 ${getColor(
                    message.user.id
                  )}`}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <p className="text-xs uppercase">{`${message.user.name[0]}`}</p>
                    </div>
                    <span className="ml-2 text-sm font-bold">
                      {message.user.name}
                    </span>
                  </div>
                  <p>{message.content}</p>
                  <p className="text-xs mt-2 text-gray-600">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(new Date(message.createdAt))}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 w-full p-8 border-t">
            <form
              action=""
              method="post"
              className="flex"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="message"
                id="message"
                className="w-full p-2 border rounded-lg"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoFocus
              />
              <button className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
