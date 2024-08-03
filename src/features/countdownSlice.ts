import { createSlice } from "@reduxjs/toolkit";

export interface State {
  count: number;
  paused: boolean;
  isOver: boolean;
}

const initialState: State = {
  count: 0,
  paused: true,
  isOver: false,
};

const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setPaused: (state, action) => {
      state.paused = action.payload;
    },
    setIsOver: (state, action) => {
      state.isOver = action.payload;
    },
  },
});

export const { setCount, setPaused, setIsOver } = countdownSlice.actions;

export default countdownSlice.reducer;
