import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogContent {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function PopOverDialog({
  title = "Dialog Title",
  trigger,
  content,
  description,
  footer,
}: DialogContent) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div>{content}</div>
          <DialogFooter>{footer}</DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
