import { setPomodoroTime, setShortBreakTime } from "@/features/settingsSlice";
import { AppDispatch, RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props {
  onClose: () => void;
}

const formSchema = z.object({
  pomodoroTime: z.any(),
  shortBreakTime: z.any(),
});

const SettingModal = ({ onClose }: Props) => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pomodoroTime: 0,
      shortBreakTime: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(setPomodoroTime(Number(values.pomodoroTime)));
    dispatch(setShortBreakTime(Number(values.shortBreakTime)));
  };

  useEffect(() => {
    form.setValue("pomodoroTime", settings.pomodoroTime);
    form.setValue("shortBreakTime", settings.shortBreakTime);
    onClose();
  }, [settings, form]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Setting</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center pt-4 mb-3">
            <Clock className="mr-2 size-5" />
            <span className="text-black m-0">Timer</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name="pomodoroTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pomodoro</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name="shortBreakTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Break</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-5">
            <Button>OK</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default SettingModal;
