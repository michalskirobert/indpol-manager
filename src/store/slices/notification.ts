import { NotificationParams } from "@/types/notifications";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationParams = {
  _id: "",
  author: { fullname: "", id: "", jobPosition: "support" },
  content: "",
  createdAt: new Date(),
  icon: "",
  readBy: [],
  type: "info",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (_, action: PayloadAction<NotificationParams | null>) => {
      if (!action.payload) return initialState;

      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
