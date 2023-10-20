import { create } from "zustand";
import { Message } from "../data";
import { io, Socket } from "socket.io-client";
import useMessageStore from "./messages.store";

type SocketStore = {
  socket: Socket | null;
  initializeSocket: (url: string) => void;
  sendMessage: (message: {
    content: string;
    channelId: number;
    userId: number;
  }) => void;
};

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  initializeSocket: (url: string) => {
    const currentSocket = useSocketStore.getState().socket;

    if (currentSocket) {
      // prevent multiple socket connections
      return;
    }
    const socketInstance = io(url);

    socketInstance.on(`newMessage`, (message: Message) => {
      useMessageStore.getState().addMessage(message);
    });

    set({ socket: socketInstance });
  },
  sendMessage: (message: {
    content: string;
    channelId: number;
    userId: number;
  }) => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.emit(`sendMessage`, message);
    }
  },
}));

export default useSocketStore;
