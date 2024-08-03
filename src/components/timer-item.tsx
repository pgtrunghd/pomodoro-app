import { sessionIncrease, setTab } from "@/features/sessionsSlice";
import useCountDown from "@/hooks/use-count-down";
import { cn, secondsToMinutesAndSeconds } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import useSound from "use-sound";
import alarm from "@/assets/alarm.mp3";

interface Props {
  tab: string;
  time: number;
}

const TimerItem = ({ tab, time }: Props) => {
  const { current, togglePause, isPaused, isOver, reset } = useCountDown();
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.sessions);
  const [play] = useSound(alarm);

  useEffect(() => {
    reset();
  }, [time]);

  useEffect(() => {
    if (isOver) {
      if (tab === "Pomodoro") {
        dispatch(setTab("Short Break"));
        play();
        dispatch(
          sessionIncrease({
            ...sessions.session,
            pomodoro: sessions.session.pomodoro + 1,
          })
        );
      } else {
        dispatch(setTab("Pomodoro"));
        play();
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
      <h1 className="text-[75px] sm:text-[100px] font-semibold text-white">
        {secondsToMinutesAndSeconds(current)}
      </h1>

      <Button
        variant={"vintage"}
        className={cn(
          "h-12",
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
