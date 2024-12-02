import {
  setPlayer,
  setPomodoroTime,
  setShortBreakTime,
} from "@/features/settingsSlice";
import { AppDispatch, RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AudioWaveform, Clock } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface Props {
  onClose: () => void;
}

const formSchema = z.object({
  pomodoroTime: z.number(),
  shortBreakTime: z.number(),
  player: z.string(),
});

const SettingModal = ({ onClose }: Props) => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(setPomodoroTime(Number(values.pomodoroTime)));
    dispatch(setShortBreakTime(Number(values.shortBreakTime)));
    dispatch(setPlayer(values.player));
    localStorage.setItem(
      "settings",
      JSON.stringify({
        pomodoroTime: values.pomodoroTime * 60,
        shortBreakTime: values.shortBreakTime * 60,
        player: values.player,
      })
    );
    onClose();
  };

  useEffect(() => {
    form.reset({
      pomodoroTime: settings.pomodoroTime / 60,
      shortBreakTime: settings.shortBreakTime / 60,
      player: settings.player,
    });
  }, [settings, form]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Setting</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <FormLabel className="flex items-center">
              <Clock className="mr-2 size-5" />
              Timer
            </FormLabel>
            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="pomodoroTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pomodoro</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortBreakTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Break</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="h-px bg-accent-foreground w-full" />

          <div className="space-y-3">
            <FormLabel className="flex items-center">
              <AudioWaveform className="mr-2 size-5" /> Music
            </FormLabel>

            <FormField
              control={form.control}
              name="player"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center gap-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="youtube" />
                        </FormControl>
                        <FormLabel>Youtube</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="spotify" />
                        </FormControl>
                        <FormLabel>Spotify</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
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
