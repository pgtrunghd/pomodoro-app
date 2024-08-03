import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  session: {
    pomodoro: number;
    shortBreak: number;
  };
  taskFocus: string;
  tab: "Pomodoro" | "Short Break";
}

const initialState: SessionState = {
  session: {
    pomodoro: 1,
    shortBreak: 1,
  },
  taskFocus: "",
  tab: "Pomodoro",
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
    setTab: (state, action) => {
      console.log(action.payload);

      state.tab = action.payload;
    },
  },
});

export const { sessionIncrease, setTaskFocus, setTab } = sessionsSlice.actions;
export default sessionsSlice.reducer;
