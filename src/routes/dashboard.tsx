import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCourses, type Course } from "@/lib/courses";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EduFlow" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => setCourses(getCourses()), []);

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const active = courses.filter((c) => c.status === "Active").length;
  const completed = courses.filter((c) => c.status === "Completed").length;
  const upcoming = courses.filter((c) => c.status === "Upcoming").length;

  const stats = [
    { label: "Total courses", value: courses.length, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: "Active", value: active, icon: GraduationCap, color: "text-success", bg: "bg-success/10" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-accent-foreground", bg: "bg-accent" },
    { label: "Upcoming", value: upcoming, icon: Clock, color: "text-warning-foreground", bg: "bg-warning/20" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
          <p className="text-muted-foreground mt-1">
            You're enrolled in {totalCredits} credits this semester.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="p-5">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Recent courses</h2>
              <p className="text-sm text-muted-foreground">Your latest enrollments</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/courses">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {courses.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-semibold text-sm shrink-0">
                    {c.code.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.instructor} • {c.credits} credits</p>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatusBadge({ status }: { status: Course["status"] }) {
  const map = {
    Active: "bg-success/15 text-success",
    Completed: "bg-muted text-muted-foreground",
    Upcoming: "bg-warning/20 text-warning-foreground",
  } as const;
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}
