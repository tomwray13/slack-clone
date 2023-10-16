import { create } from "zustand";
import { Channel } from "../data";

interface ChannelStore {
  channels: Channel[];
  addChannel: (channel: Channel) => void;
}

const useChannelStore = create<ChannelStore>((set) => ({
  channels: [], // Initialize with an empty array

  // Function to add a new channel to the state
  addChannel: (channel) =>
    set((state) => ({
      channels: [...state.channels, channel],
    })),
}));

export default useChannelStore;
