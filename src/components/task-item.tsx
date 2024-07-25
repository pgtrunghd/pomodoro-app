import { setTaskFocus } from "@/features/sessionsSlice";
import {
  deleteTask,
  fetchTasks,
  Task,
  updateTask,
} from "@/features/tasksSlice";
import { AppDispatch } from "@/store";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Check, PenLine, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  taskFocus: string;
  setOpenEdit: any;
}

const TaskItem = ({ task, taskFocus, setOpenEdit }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li
      className={cn(
        "flex items-center justify-between bg-slate-800 rounded-md py-3 px-5 cursor-pointer hover:bg-gray-700/60 transition",
        taskFocus === task.name ? "scale-95" : ""
      )}
      key={task.id}
      onClick={() => {
        dispatch(setTaskFocus(task.name));
      }}
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
            await dispatch(updateTask({ ...task, isDone: !task.isDone }));
            await dispatch(fetchTasks());
          }}
        >
          <Check className="text-white" size={16} />
        </span>
        <p className={cn(task.isDone ? "line-through" : "")}>{task.name}</p>
      </div>
      <span className="flex items-center gap-3">
        <Button
          size="iconsm"
          onClick={(e) => {
            e.stopPropagation();
            setOpenEdit(task.id);
          }}
        >
          <PenLine size={20} />
        </Button>
        <Button
          size="iconsm"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTask(task.id as number));
          }}
        >
          <Trash2 size={20} />
        </Button>
      </span>
    </li>
  );
};

export default TaskItem;