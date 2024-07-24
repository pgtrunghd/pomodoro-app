import { useEffect, useRef, useState } from "react";
import TimerItem from "./timer-item";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Timer = () => {
  const [tab, setTab] = useState("Pomodoro");
  const pomodoroTime = useRef(1500);
  const shortBreakTime = useRef(300);

  return (
    <div className="bg-slate-800 rounded-md py-5 text-center">
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
          <TimerItem setTab={setTab} tab={tab} time={shortBreakTime.current} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Timer;
