import { UserProps } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reducer {
  user: UserProps | null;
}

const initialState: Reducer = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setDefaultUser: () => initialState,
  },
});

export const { setUser, setDefaultUser } = userSlice.actions;

export default userSlice.reducer;
