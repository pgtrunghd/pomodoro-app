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
import Header from "./components/header";

function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const tab = useSelector((state: RootState) => state.sessions.tab);
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <main
      className={cn(
        "min-h-screen pb-10 transition-all",
        tab === "Pomodoro" ? "bg-slate-900" : "bg-cyan-500"
      )}
    >
      <section className="container h-full max-w-2xl">
        <Header />

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

        <div className="w-full mt-10">
          {settings.player === "youtube" ? (
            <iframe
              className="aspect-video w-full rounded-lg"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?si=YgnCHQCR6kjNVWDi"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <iframe
              className="aspect-[4/3] w-full"
              src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
