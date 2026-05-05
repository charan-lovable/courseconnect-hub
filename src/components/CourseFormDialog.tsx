import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Course } from "@/lib/courses";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: Course | null;
  onSave: (course: Course) => void;
};

export function CourseFormDialog({ open, onOpenChange, initial, onSave }: Props) {
  const [form, setForm] = useState<Course>({
    id: "",
    code: "",
    title: "",
    instructor: "",
    credits: 3,
    status: "Active",
  });

  useEffect(() => {
    if (initial) setForm(initial);
    else
      setForm({
        id: crypto.randomUUID(),
        code: "",
        title: "",
        instructor: "",
        credits: 3,
        status: "Active",
      });
  }, [initial, open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.title || !form.instructor) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit course" : "Add new course"}</DialogTitle>
          <DialogDescription>
            {initial ? "Update the course details below." : "Enter details to add a course to your list."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Course code</Label>
              <Input
                id="code"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="CS101"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min={1}
                max={10}
                value={form.credits}
                onChange={(e) => setForm({ ...form, credits: Number(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Introduction to Computer Science"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              value={form.instructor}
              onChange={(e) => setForm({ ...form, instructor: e.target.value })}
              placeholder="Dr. Smith"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as Course["status"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save changes" : "Add course"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
