import { useState } from "react";
import TaskList from "../components/TaskList";


type Task = {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Pending";
};

const dummyTasks: Task[] = [
  { id: 1, title: "Learn JavaScript", status: "Completed" },
  { id: 2, title: "Build Task Manager", status: "In Progress" },
  { id: 3, title: "Apply GSOC", status: "Pending" },
  { id: 4, title: "Learn React", status: "In Progress" },
  { id: 5, title: "Cook Yams", status: "Pending" },
];

export default function TasksPage() {
  const [filter, setFilter] = useState("All");

  const filteredTasks =
    filter === "All"
      ? dummyTasks
      : dummyTasks.filter((task) => task.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

    
      <div className="flex gap-2 mb-6">
        {["All", "Completed", "In Progress", "Pending"].map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full font-medium border cursor-pointer ${
              filter === status
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

     
      <TaskList tasks={filteredTasks} />
    </div>
  );
}
