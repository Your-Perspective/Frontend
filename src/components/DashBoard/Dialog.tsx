import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogAdminProp } from "@/types/Types";

export default function DialogAdmin({
  title,
  children,
  isOpen,
  onClose,
  onSave,
}: DialogAdminProp) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] h-fit max-h-[calc(100%_-_32px)] overflow-hidden">
        <DialogHeader className="flex text-start">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px] p-4">{children}</div>
        <DialogFooter className="border-gray-200 pt-3">
          <Button type="button" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
