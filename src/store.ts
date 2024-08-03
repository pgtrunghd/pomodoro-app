import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice";
import sessionsReducer from "./features/sessionsSlice";
import settingsReducer from "./features/settingsSlice";
import countdownReducer from "./features/countdownSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    sessions: sessionsReducer,
    settings: settingsReducer,
    countdown: countdownReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
