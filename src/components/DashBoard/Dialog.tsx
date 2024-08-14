import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

interface DialogAdmin {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function DialogAdmin({
  title,
  children,
  isOpen,
  onClose,
  onSave,
}: DialogAdmin) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] h-fit max-h-[calc(100%_-_32px)]">
        <DialogHeader className="flex text-start">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="button" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}