import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./App.css";
import TaskCreate from "./components/task-create";
import TaskList from "./components/task-list";
import Timer from "./components/timer";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { cn } from "./lib/utils";

function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const tab = useSelector((state: RootState) => state.sessions.tab);

  return (
    <main
      className={cn(
        "min-h-screen py-10 transition-all",
        tab === "Pomodoro" ? "bg-slate-900" : "bg-cyan-500"
      )}
    >
      <section className="container max-w-screen-sm h-full">
        <Timer />

        <TaskList />

        {openCreate ? (
          <TaskCreate onClose={() => setOpenCreate(false)} />
        ) : (
          <Button
            variant={"vintage"}
            className="w-full capitalize text-lg"
            onClick={() => setOpenCreate(true)}
          >
            Add Task
          </Button>
        )}
      </section>
    </main>
  );
}

export default App;
