import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@backend/types";

export interface MessageState {
  data: Message[];
}

const initialState: MessageState = {
  data: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.data = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<Pick<Message, `channelId` | `content` | `user`>>
    ) => {
      state.data.unshift({
        id: state.data.length + 1,
        channelId: action.payload.channelId,
        content: action.payload.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: action.payload.user,
      });
    },
  },
});

export const { addMessage, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
