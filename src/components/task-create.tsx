import { addTask, Task, updateTask } from "@/features/tasksSlice";
import { AppDispatch } from "@/store";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
  task?: Task;
};

const formSchema = z.object({
  name: z.string().min(0, "Task name is required"),
});

const TaskCreate = ({ onClose, task }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name } = values;
    if (task) {
      dispatch(updateTask({ ...task, name }));
    } else {
      dispatch(addTask({ name }));
    }
    onClose();
  };

  useEffect(() => {
    if (task) {
      form.setValue("name", task.name);
    }
  }, [task]);

  return (
    <div className="bg-white p-5 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-none focus-visible:ring-0 placeholder:italic text-xl"
                    placeholder="What are you working on"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2 mt-4">
            <Button onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskCreate;
