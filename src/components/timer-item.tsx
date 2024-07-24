import useCountDown from "@/hooks/use-count-down";
import { cn, secondsToMinutesAndSeconds } from "@/lib/utils";
import { Button } from "./ui/button";
import CircleProgress from "./circle-progress";
import { Progress } from "./ui/progress";
import { useEffect } from "react";

interface Props {
  setTab: any;
  tab: string;
  time: number;
}

const TimerItem = ({ setTab, tab, time }: Props) => {
  const { current, togglePause, isPaused, isOver } = useCountDown(0, time);

  useEffect(() => {
    if (isOver) {
      tab === "Pomodoro" ? setTab("Short Break") : setTab("Pomodoro");
    }
  }, [isOver]);

  return (
    <>
      <h1 className="text-[100px] font-semibold text-white">
        {secondsToMinutesAndSeconds(current)}
      </h1>

      <Button
        className={cn(
          "text-3xl uppercase h-fit w-[200px] shadow-[0_6px_0_0px] shadow-blue-700 active:translate-y-0 translate-y-[-6px] active:shadow-none mt-5",
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
