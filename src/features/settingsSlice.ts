import { createSlice } from "@reduxjs/toolkit";

export interface State {
  pomodoroTime: number;
  shortBreakTime: number;
  player: string;
}

const initialState: State = JSON.parse(
  localStorage.getItem("settings") as string
) ?? {
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  player: "youtube",
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
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
});

export const { setPomodoroTime, setShortBreakTime, setPlayer } =
  settingsSlice.actions;
export default settingsSlice.reducer;
