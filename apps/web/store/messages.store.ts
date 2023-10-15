import { create } from "zustand";

interface Message {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: { id: string; firstName: string; lastName: string };
}

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
