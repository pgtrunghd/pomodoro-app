import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import SettingModal from "./setting-modal";
import { useState } from "react";

const Header = () => {
  const tab = useSelector((state: RootState) => state.sessions.tab);
  const [open, setOpen] = useState(false);

  return (
    <section className="py-4 mb-5">
      <div className="flex items-center justify-end">
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
    </section>
  );
};

export default Header;
