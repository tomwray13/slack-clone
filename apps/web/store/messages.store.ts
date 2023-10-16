import { create } from "zustand";
import { Message } from "../data";

interface MessageStore {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [], // Initialize with an empty array

  // Function to add a new message to the state
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
}));

export default useMessageStore;
