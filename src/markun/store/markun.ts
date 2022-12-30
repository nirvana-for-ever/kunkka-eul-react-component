import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState: {
  wordCount: number;
  lineCount: number;
  curMainVisible: string;
  curSidebarVisible: string;
} = {
  wordCount: 0,
  lineCount: 0,
  curMainVisible: 'both',
  curSidebarVisible: 'none'
};

const markunSlice = createSlice({
  name: 'markun',
  initialState,
  reducers: {
    setInfo(state, action) {
      const { wordCount, lineCount } = action.payload;
      if (wordCount !== undefined) state.wordCount = wordCount;
      if (lineCount !== undefined) state.lineCount = lineCount;
    },
    setCurMainVisible(state, action) {
      if (state.curMainVisible === action.payload) {
        state.curMainVisible = 'both';
        return;
      }
      state.curMainVisible = action.payload;
    },
    setCurSidebarVisible(state, action) {
      if (state.curSidebarVisible === action.payload) {
        state.curSidebarVisible = 'none';
        return;
      }
      state.curSidebarVisible = action.payload;
    }
  }
});

export const { setInfo, setCurMainVisible, setCurSidebarVisible } = markunSlice.actions;

export const store = configureStore({
  reducer: markunSlice.reducer
});
