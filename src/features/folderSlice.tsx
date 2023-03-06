import { createSlice } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    choose: 0,
    id: "",
  },
  reducers: {
    setFolder: (state, action) => {
      state.folders = action.payload.folders;
    },
    choose: (state, action) => {
      state.choose = action.payload.choose;
      state.id = action.payload.id;
    },
  },
});

export const { setFolder } = folderSlice.actions;

export const selectFolder = (state) => state.folder.folders;

export const chooseFolder = (state) => state.folder.choose;
export const chooseId = (state) => state.folder.id;

export default folderSlice.reducer;
