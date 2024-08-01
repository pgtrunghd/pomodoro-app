import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice";
import sessionsReducer from "./features/sessionsSlice";
import settingsReducer from "./features/settingsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    sessions: sessionsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
