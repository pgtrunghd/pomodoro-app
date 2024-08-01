import { sessionIncrease, setTab } from "@/features/sessionsSlice";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import TimerItem from "./timer-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Timer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessions = useSelector((state: RootState) => state.sessions);
  const taskFocus = useSelector((state: RootState) => state.sessions.taskFocus);
  const tab = useSelector((state: RootState) => state.sessions.tab);
  const settings = useSelector((state: RootState) => state.settings);
  const pomodoroTime = 60 * settings.pomodoroTime;
  const shortBreakTime = 60 * settings.shortBreakTime;

  return (
    <>
      <div
        className={cn(
          "rounded-md pt-5 pb-7 text-center transition",
          tab === "Pomodoro" ? "bg-slate-800" : "bg-cyan-600"
        )}
      >
        <Tabs
          value={tab}
          onValueChange={(value) => {
            dispatch(setTab(value));
          }}
        >
          <TabsList>
            <TabsTrigger value="Pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="Short Break">Short Break</TabsTrigger>
          </TabsList>
          <TabsContent value="Pomodoro">
            <TimerItem tab={tab} time={pomodoroTime} />
          </TabsContent>
          <TabsContent value="Short Break">
            <TimerItem tab={tab} time={shortBreakTime} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-center mt-4 mb-5 space-y-2">
        <p
          className="cursor-pointer hover:text-white/50 transition"
          onClick={() => {
            const result = confirm("You want to refresh session?");
            if (result) {
              dispatch(
                sessionIncrease({
                  pomodoro: 1,
                  shortBreak: 1,
                })
              );
            } else {
              return;
            }
          }}
        >
          Session{" "}
          {tab === "Pomodoro"
            ? sessions.session.pomodoro
            : sessions.session.shortBreak}
        </p>
        <p>
          {taskFocus
            ? taskFocus
            : tab === "Pomodoro"
            ? "Time to focus"
            : "It's time to take a break"}
        </p>
      </div>
    </>
  );
};

export default Timer;
