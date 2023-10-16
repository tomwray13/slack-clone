"use client";

import { Message } from "../data";

const Message = ({ message }: { message: Message }) => {
  const loggedInUser = {
    id: 700,
  };
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-red-50",
  ];
  const getColor = (userId: number) => colors[userId % colors.length];
  return (
    <div
      className={`w-4/5 ${
        message.user.id === loggedInUser.id ? "self-start" : "self-end"
      }`}
    >
      <div className={`rounded-lg py-2 px-4 ${getColor(message.user.id)}`}>
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <p className="text-xs uppercase">{`${message.user.firstName[0]}${message.user.lastName[0]}`}</p>
          </div>
          <span className="ml-2 text-sm font-bold">
            {message.user.firstName} {message.user.lastName}
          </span>
        </div>
        <p>{message.text}</p>
        <p className="text-xs mt-2 text-gray-600">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(message.createdAt))}
        </p>
      </div>
    </div>
  );
};

export { Message };
