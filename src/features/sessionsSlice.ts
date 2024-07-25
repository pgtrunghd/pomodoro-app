import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  session: {
    pomodoro: number;
    shortBreak: number;
  };
  taskFocus: string;
}

const initialState: SessionState = {
  session: {
    pomodoro: 1,
    shortBreak: 1,
  },
  taskFocus: "",
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    sessionIncrease: (state, action) => {
      state.session = action.payload;
    },
    setTaskFocus: (state, action) => {
      state.taskFocus = action.payload;
    },
  },
});

export const { sessionIncrease, setTaskFocus } = sessionsSlice.actions;
export default sessionsSlice.reducer;
