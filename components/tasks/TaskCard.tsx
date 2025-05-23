import { Task } from "@/interfaces/task";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="bg-[var(--card)] p-4 rounded-md shadow text-sm font-medium space-y-1">
      <div className="text-md mb-2 w-fit">
        {task.initials}
      </div>
      <div className="flex items-center justify-between">
        <div>{task.title}</div>
        <div className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded w-fit">
          {task.assignee}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
