import { UserProps } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  selectedUser: (Omit<UserProps, "_id"> & { id: string }) | null;
  count: number;
}

const initialState: InitialState = {
  selectedUser: null,
  count: 0,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<UserProps | null>) => {
      if (!action.payload) return state;

      const { _id, ...restProps } = action.payload;

      const user = { ...restProps, id: action.payload?._id.toString()! };

      state.selectedUser = user;

      if (state.count > 0) {
        state.count -= 1;
      }
    },
    setMessagesCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setSelectedUser, setMessagesCount } = messagesSlice.actions;
export default messagesSlice.reducer;
