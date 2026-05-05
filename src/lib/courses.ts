export type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  status: "Active" | "Completed" | "Upcoming";
};

const KEY = "scm_courses";

const seed: Course[] = [
  { id: "1", code: "CS101", title: "Intro to Computer Science", instructor: "Dr. Lin", credits: 4, status: "Active" },
  { id: "2", code: "MATH204", title: "Linear Algebra", instructor: "Prof. Patel", credits: 3, status: "Active" },
  { id: "3", code: "ENG110", title: "Academic Writing", instructor: "Ms. Carter", credits: 2, status: "Completed" },
  { id: "4", code: "PHY220", title: "Modern Physics", instructor: "Dr. Okafor", credits: 4, status: "Upcoming" },
  { id: "5", code: "DES150", title: "UI/UX Foundations", instructor: "Mr. Tanaka", credits: 3, status: "Active" },
];

export function getCourses(): Course[] {
  if (typeof window === "undefined") return seed;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

export function saveCourses(c: Course[]) {
  localStorage.setItem(KEY, JSON.stringify(c));
}
