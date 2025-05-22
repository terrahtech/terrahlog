export interface Task {
  id: string;
  code: string;
  title: string;
  status: "open" | "in-progress" | "done";
  assignee: string;
  initials: string;
}
