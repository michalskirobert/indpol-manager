import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SidebarState = "expanded" | "collapsed";

interface Reducer {
  isSidebarOpen: boolean;
  isNotificationModalOpen: boolean;
}

const initialState: Reducer = {
  isSidebarOpen: true,
  isNotificationModalOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setIsNotificationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isNotificationModalOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setIsNotificationModalOpen } =
  layoutSlice.actions;
export default layoutSlice.reducer;
