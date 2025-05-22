import TaskCard from "./TaskCard";
import { Task } from "@/interfaces/task";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  title: string;
  tasks: Task[];
  droppableId: string;
}

const TaskColumn: React.FC<Props> = ({ title, tasks, droppableId }) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs bg-[var(--card)] rounded-md p-4 shadow-md">
      <h2 className="text-sm border-b pb-2 uppercase">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 min-h-[100px] ${
              snapshot.isDraggingOver ? "bg-[var(--light)] rounded" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? "bg-blue-100" : ""}`}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
