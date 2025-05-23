import Layout from "@/components/Layout";
import Sidebar from "@/components/tasks/Sidebar";
import TaskColumn from "@/components/tasks/TaskColumn";
import { useState } from "react";
import { Task } from "@/interfaces/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const initialTasks: Task[] = [
  { id: "1", code: "FF-1", title: "designing", status: "done", assignee: "NK", initials: "FF" },
  { id: "2", code: "FGT-1", title: "bundle design", status: "done", assignee: "NK", initials: "FGT" },
  { id: "3", code: "CCA-1", title: "designing", status: "in-progress", assignee: "NK", initials: "CCA" },
  { id: "4", code: "HN-1", title: "designing", status: "open", assignee: "NK", initials: "HN" },
  { id: "5", code: "FGT-2", title: "pdp templates design", status: "open", assignee: "NK", initials: "FGT" },
  { id: "6", code: "FGT-3", title: "edits", status: "open", assignee: "NK", initials: "FGT" },
];

const TasksPage = () => {
  const [activeProject, setActiveProject] = useState("ALL");
  const [tasks, setTasks] = useState(initialTasks);

  // Filter tasks by active project
  const filteredTasks = activeProject === "ALL"
    ? tasks
    : tasks.filter((t) => t.initials === activeProject);

  // Separate tasks by status for each column
  const doneTasks = filteredTasks.filter((t) => t.status === "done");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in-progress");
  const openTasks = filteredTasks.filter((t) => t.status === "open");

  // On drag end handler to update the task's status
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) return;

    // dropped in same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Find the task being dragged
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    // Update task status to new column's droppableId
    const newStatus = destination.droppableId;

    // Update task status in the state
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">My Tasks</h1>
      <div className="flex">
        <Sidebar activeProject={activeProject} setActiveProject={setActiveProject} />
        <div className="flex-1 px-6 pb-4 overflow-x-auto flex gap-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <TaskColumn key="open" droppableId="open" title="OPEN" tasks={openTasks} />
            <TaskColumn key="in-progress" droppableId="in-progress" title="IN PROGRESS" tasks={inProgressTasks} />
            <TaskColumn key="done" droppableId="done" title="DONE" tasks={doneTasks} />
          </DragDropContext>
        </div>
      </div>
    </Layout>
  );
};

export default TasksPage;
