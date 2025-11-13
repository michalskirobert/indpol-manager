import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SidebarState = "expanded" | "collapsed";

interface Reducer {
  isSidebarOpen: boolean;
}

const initialState: Reducer = {
  isSidebarOpen: false,
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
  },
});

export const { toggleSidebar, setSidebarOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
