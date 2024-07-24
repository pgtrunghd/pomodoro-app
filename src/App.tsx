import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./App.css";
import TaskCreate from "./components/task-create";
import TodoList from "./components/todo-list";
import Timer from "./components/timer";
import { Progress } from "./components/ui/progress";

function App() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <main className=" h-screen py-10">
      <section className="container max-w-screen-sm h-full">
        {/* <Progress /> */}

        <Timer />

        <TodoList />

        {openCreate ? (
          <TaskCreate onClose={() => setOpenCreate(false)} />
        ) : (
          <Button className="w-full" onClick={() => setOpenCreate(true)}>
            Add
          </Button>
        )}
      </section>
    </main>
  );
}

export default App;
