import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ErrorBoundary from "./components/error-boundary";
import TaskCreate from "./components/task-create";
import TaskList from "./components/task-list";
import Timer from "./components/timer";
import { cn } from "./lib/utils";
import { RootState } from "./store";

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

        <ErrorBoundary>
          <>
            <TaskList />
            {openCreate ? (
              <TaskCreate onClose={() => setOpenCreate(false)} />
            ) : (
              <Button
                variant={"vintage"}
                className="w-full capitalize text-lg"
                onClick={() => setOpenCreate(true)}
              >
                <Plus className="mr-2 size-5" />
                Add Task
              </Button>
            )}
          </>
        </ErrorBoundary>
      </section>
    </main>
  );
}

export default App;
