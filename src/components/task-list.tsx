import {
  deleteFinishedTasks,
  deleteTaskAll,
  fetchTasks,
} from "@/features/tasksSlice";
import { AppDispatch, RootState } from "@/store";
import { Ellipsis, LoaderCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCreate from "./task-create";
import TaskItem from "./task-item";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);
  const taskFocus = useSelector((state: RootState) => state.sessions.taskFocus);
  const tasksData = tasks.tasks;
  const [openEdit, setOpenEdit] = useState<number | null>();

  useEffect(() => {
    if (tasks.status === "idle") {
      dispatch(fetchTasks());
    }
  }, []);

  if (tasks.error) {
    throw new Error(tasks.error);
  }

  return (
    <>
      <div className="text-white text-lg flex items-center justify-between">
        <p>Tasks</p>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button size={"iconsm"} variant={"ghost"}>
              <Ellipsis className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => dispatch(deleteFinishedTasks())}>
              <Trash2 className="mr-2 size-4" />
              <span>Clear finished tasks</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(deleteTaskAll())}>
              <Trash2 className="mr-2 size-4" />
              <span>Clear all tasks</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="my-5 space-y-4 relative">
        {tasks.status === "loading" && (
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30 rounded-md flex items-center justify-center z-10">
            <LoaderCircle className="text-white animate-spin" />
          </div>
        )}
        {tasksData?.map((task) =>
          openEdit === task.id ? (
            <TaskCreate
              task={task}
              onClose={() => setOpenEdit(null)}
              key={task.id}
            />
          ) : (
            <TaskItem
              task={task}
              taskFocus={taskFocus}
              key={task.id}
              setOpenEdit={setOpenEdit}
            />
          )
        )}
      </ul>
    </>
  );
};

export default TaskList;
