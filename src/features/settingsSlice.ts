import { createSlice } from "@reduxjs/toolkit";

export interface State {
  pomodoroTime: number;
  shortBreakTime: number;
}

const initialState: State = {
  pomodoroTime: 25,
  shortBreakTime: 5,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPomodoroTime: (state, action) => {
      state.pomodoroTime = action.payload;
    },
    setShortBreakTime: (state, action) => {
      state.shortBreakTime = action.payload;
    },
  },
});

export const { setPomodoroTime, setShortBreakTime } = settingsSlice.actions;
export default settingsSlice.reducer;
