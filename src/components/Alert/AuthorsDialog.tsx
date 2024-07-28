import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogShow({
  slug,
  children,
}: {
  slug?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slug || "Detail dialog"}</DialogTitle>
          <DialogDescription>Pending on development</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
