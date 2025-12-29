"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SidebarState = "expanded" | "collapsed";

export type ThemeType = "light" | "dark";

interface Reducer {
  isSidebarOpen: boolean;
  isNotificationModalOpen: boolean;
  theme: ThemeType;
}

const initialState: Reducer = {
  theme: "light",
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
    updateTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;

      localStorage.setItem("layout.theme", action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setIsNotificationModalOpen,
  updateTheme,
} = layoutSlice.actions;
export default layoutSlice.reducer;
