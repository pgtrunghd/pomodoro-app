import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import SettingModal from "./setting-modal";
import { useState } from "react";
import { Progress } from "./ui/progress";
import useCountDown from "@/hooks/use-count-down";

const Header = () => {
  const tab = useSelector((state: RootState) => state.sessions.tab);
  const settings = useSelector((state: RootState) => state.settings);
  const [open, setOpen] = useState(false);
  const time =
    tab === "Pomodoro" ? settings.pomodoroTime : settings.shortBreakTime;
  const { current } = useCountDown();
  const progress = ((time - current) / time) * 100;

  return (
    <section className="py-4 mb-5">
      <div className="flex items-center justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size={"sm"}
              className={cn(
                tab === "Pomodoro"
                  ? "bg-slate-800 hover:bg-slate-800/60"
                  : "bg-cyan-600 hover:bg-cyan-600/60"
              )}
            >
              <Settings className="text-white mr-2 size-5" />
              Setting
            </Button>
          </DialogTrigger>
          <SettingModal onClose={() => setOpen(false)} />
        </Dialog>
      </div>
      <Progress value={progress} />
    </section>
  );
};

export default Header;
