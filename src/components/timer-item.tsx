import { sessionIncrease } from "@/features/sessionsSlice";
import useCountDown from "@/hooks/use-count-down";
import { cn, secondsToMinutesAndSeconds } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

interface Props {
  setTab: any;
  tab: string;
  time: number;
}

const TimerItem = ({ setTab, tab, time }: Props) => {
  const { current, togglePause, isPaused, isOver } = useCountDown(0, time);
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.sessions);

  useEffect(() => {
    if (isOver) {
      if (tab === "Pomodoro") {
        setTab("Short Break");
        dispatch(
          sessionIncrease({
            ...sessions.session,
            pomodoro: sessions.session.pomodoro + 1,
          })
        );
      } else {
        setTab("Pomodoro");
        dispatch(
          sessionIncrease({
            ...sessions.session,
            shortBreak: sessions.session.shortBreak + 1,
          })
        );
      }
    }
  }, [isOver]);

  return (
    <>
      <h1 className="text-[100px] font-semibold text-white">
        {secondsToMinutesAndSeconds(current)}
      </h1>

      <Button
        className={cn(
          "text-3xl uppercase h-fit w-[200px] shadow-[0_6px_0_0px] shadow-blue-700 active:translate-y-0 translate-y-[-6px] active:shadow-none mt-3",
          isPaused || isOver ? "" : "translate-y-0 shadow-none"
        )}
        onClick={togglePause}
      >
        {isPaused || isOver ? "Start" : "Pause"}
      </Button>
    </>
  );
};

export default TimerItem;
