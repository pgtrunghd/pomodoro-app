import { setCount, setPaused } from "@/features/countdownSlice";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface Counter {
  current: number;
  isPaused: boolean;
  isOver: boolean;
  pause: () => void;
  play: () => void;
  reset: () => void;
  togglePause: () => void;
}

const useCountDown = (): Counter => {
  const dispatch = useDispatch<AppDispatch>();
  const tab = useSelector((state: RootState) => state.sessions.tab);
  const { pomodoroTime, shortBreakTime } = useSelector(
    (state: RootState) => state.settings
  );
  // const [count, setCount] = useState(
  //   tab === "Pomodoro" ? pomodoroTime : shortBreakTime
  // );
  // const [paused, setPaused] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const count = useSelector((state: RootState) => state.countdown.count);
  const paused = useSelector((state: RootState) => state.countdown.paused);
  // const isOver = useSelector((state: RootState) => state.countdown.isOver);

  useEffect(() => {
    dispatch(setCount(tab === "Pomodoro" ? pomodoroTime : shortBreakTime));
    dispatch(setPaused(true));
  }, [pomodoroTime, shortBreakTime, tab, dispatch]);

  useEffect(() => {
    if (paused) {
      return;
    }

    const interval = setInterval(() => {
      // setCount((prev: number) => prev - 1);
      dispatch(setCount(count - 1));
    }, 1000);

    if (count <= 0) {
      setIsOver(true);
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [count, paused, dispatch]);

  return {
    current: count,
    isPaused: paused,
    isOver,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(false);
      dispatch(setCount(tab === "Pomodoro" ? pomodoroTime : shortBreakTime));
    },
    togglePause: () => dispatch(setPaused(!paused)),
  };
};

export default useCountDown;
