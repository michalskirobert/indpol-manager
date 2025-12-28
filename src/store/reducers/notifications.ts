import { NotificationParams } from "@/types/notifications";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  notification: NotificationParams | null;
  count: number;
}

const initialState: InitialState = {
  notification: null,
  count: 0,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<NotificationParams | null>,
    ) => {
      state.notification = action.payload;

      if (state.count > 0) {
        state.count -= 1;
      }
    },
    setNotificationsCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setNotification, setNotificationsCount } =
  notificationSlice.actions;
export default notificationSlice.reducer;
