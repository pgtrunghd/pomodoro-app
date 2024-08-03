import { setTaskFocus } from "@/features/sessionsSlice";
import {
  deleteTask,
  fetchTasks,
  Task,
  updateTask,
} from "@/features/tasksSlice";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { Check, PenLine, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

interface Props {
  task: Task;
  taskFocus: string;
  setOpenEdit: React.Dispatch<React.SetStateAction<number | null | undefined>>;
}

const TaskItem = ({ task, taskFocus, setOpenEdit }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tab = useSelector((state: RootState) => state.sessions.tab);

  return (
    <li
      className={cn(
        "flex items-center justify-between rounded-md py-3 px-5 cursor-pointer  transition",
        taskFocus === task.name ? "scale-95" : "",
        tab === "Pomodoro"
          ? "bg-slate-800 hover:bg-gray-800/60"
          : "bg-cyan-600 hover:bg-cyan-600/60"
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
          onClick={async (e) => {
            e.stopPropagation();
            await dispatch(deleteTask(task.id as number));
            await dispatch(fetchTasks());
          }}
        >
          <Trash2 size={20} />
        </Button>
      </span>
    </li>
  );
};

export default TaskItem;
