import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
  },
  reducers: {
    setFolder: (state, action) => {
      state.folders = action.payload.folders;
    },
  },
});

export const { setFolder } = folderSlice.actions;

export const selectFolder = (state) => state.folder.folders;

export default folderSlice.reducer;
