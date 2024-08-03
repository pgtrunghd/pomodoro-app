import { createSlice } from "@reduxjs/toolkit";

export interface State {
  pomodoroTime: number;
  shortBreakTime: number;
}

const initialState: State = {
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPomodoroTime: (state, action) => {
      state.pomodoroTime = action.payload * 60;
    },
    setShortBreakTime: (state, action) => {
      state.shortBreakTime = action.payload * 60;
    },
  },
});

export const { setPomodoroTime, setShortBreakTime } = settingsSlice.actions;
export default settingsSlice.reducer;
