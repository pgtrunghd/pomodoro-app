import { deleteTask, fetchTasks, updateTask } from "@/features/tasksSlice";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { Check, LoaderCircle, PenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCreate from "./task-create";
import { Button } from "./ui/button";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);
  const tasksData = tasks.tasks;
  const [openEdit, setOpenEdit] = useState<Number | null>();

  useEffect(() => {
    if (tasks.status === "idle") {
      dispatch(fetchTasks());
    }
  }, []);

  return (
    <>
      <ul className="my-5 space-y-4 relative">
        {/* <p className="text-xl border-b pb-4">Task</p> */}
        {tasks.status === "loading" && (
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30 rounded-md flex items-center justify-center">
            <LoaderCircle className="text-white animate-spin" />
          </div>
        )}
        {tasksData.map((task) =>
          openEdit === task.id ? (
            <TaskCreate
              task={task}
              onClose={() => setOpenEdit(null)}
              key={task.id}
            />
          ) : (
            <li
              className="flex items-center justify-between bg-slate-800 rounded-md py-3 px-5 cursor-pointer hover:bg-gray-700/60 transition"
              key={task.id}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "size-6 rounded-md transition flex items-center justify-center active:scale-100",
                    task.isDone
                      ? "bg-green-600 hover:bg-green-600/50"
                      : "bg-slate-600 hover:bg-slate-600/50"
                  )}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await dispatch(
                      updateTask({ ...task, isDone: !task.isDone })
                    );
                    await dispatch(fetchTasks());
                  }}
                >
                  <Check className="text-white" size={16} />
                </span>
                <p className={cn(task.isDone ? "line-through" : "")}>
                  {task.name}
                </p>
              </div>
              <span className="flex items-center gap-3">
                <Button size="iconsm" onClick={() => setOpenEdit(task.id)}>
                  <PenLine size={20} />
                </Button>
                <Button
                  size="iconsm"
                  variant="destructive"
                  onClick={() => {
                    dispatch(deleteTask(task.id as number));
                  }}
                >
                  <Trash2 size={20} />
                </Button>
              </span>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default TaskList;