import TaskItem from "./TaskItems";

interface Task {
  id: number;
  title: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  view: "list" | "card";
}

export default function TaskList({ tasks, onDelete, view }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="mt-4 text-gray-500">No tasks to show.</p>;
  }

  return (
    <ul
      className={`shadow-lg rounded-lg bg-white p-3 ${
        view === "list"
          ? "flex flex-col gap-3"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      }`}
    >
      

      {tasks.map((task) => (
        <li key={task.id} 
        className={`${ view === "list" ? "flex items-center justify-between gap-3" : 
        "flex flex-col gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"}`}>

          <TaskItem title={task.title} status={task.status} />

         
          <button
            onClick={() => onDelete(task.id)}
            className=" ml-4 px-3 py-1 bg-red-400 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}