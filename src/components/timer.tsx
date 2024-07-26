import { AppDispatch, RootState } from "@/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimerItem from "./timer-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { sessionIncrease } from "@/features/sessionsSlice";

const Timer = () => {
  const [tab, setTab] = useState("Pomodoro");
  const sessions = useSelector((state: RootState) => state.sessions);
  const taskFocus = useSelector((state: RootState) => state.sessions.taskFocus);
  const pomodoroTime = useRef(5);
  const shortBreakTime = useRef(5);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="bg-slate-800 rounded-md pt-5 pb-7 text-center">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value);
          }}
        >
          <TabsList>
            <TabsTrigger value="Pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="Short Break">Short Break</TabsTrigger>
          </TabsList>
          <TabsContent value="Pomodoro">
            <TimerItem setTab={setTab} tab={tab} time={pomodoroTime.current} />
          </TabsContent>
          <TabsContent value="Short Break">
            <TimerItem
              setTab={setTab}
              tab={tab}
              time={shortBreakTime.current}
            />
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
