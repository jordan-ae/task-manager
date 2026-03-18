import { useState } from "react";
import TaskList from "../components/TaskList";

type Task = {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
};

export const dummyTasks: Task[] = [
  { id: 1, title: "Learn JavaScript", status: "Completed" },
  { id: 2, title: "Build Task Manager", status: "In Progress" },
  { id: 3, title: "Apply GSOC", status: "Pending" },
  { id: 4, title: "Learn React", status: "In Progress" },
  { id: 5, title: "Cook Yams", status: "Pending" },
  { id: 6, title: "Bash Projects", status: "Completed" },
];




export default function TasksPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [extraTasks, setExtraTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [view, setView] = useState<"list" | "card">("list");

  const addTask = () => {
    if (!taskTitle.trim()) return;

    setExtraTasks([
      ...extraTasks,
      { id: Date.now(), title: taskTitle, status: "Pending" },
    ]);

    setTaskTitle("");
  }

  const allTasks = [...dummyTasks, ...extraTasks];

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  const deleteTasks = (id: number) => {
    setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="p-6 rounded bg-gray-100 h-screen">
        <h1 className="text-2xl font-bold uppercase mb-3 tracking-[0.16em] text-orange-700">
          Tasks
        </h1>
        <div className="bg-amber-100 w-60 p-3">
          <p className="text-lg font-semibold text-stone-950 mb-3">
            Select your view mode
          </p>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 border font-semibold rounded transition cursor-pointer mr-4 ${view === "list"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("card")}
            className={`px-3 py-1 border rounded font-semibold transition cursor-pointer ${view === "card"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            Card View
          </button>
        </div>
      </div>

      <div className="flex mb-6 mt-4 justify-between rounded-[1.75rem] border border-stone-800/10 bg-white/75 p-6 shadow-sm">
        {["All", "Completed", "In Progress", "Pending", "Overdue"].map(
          (status) => (
            <button
              key={status}
              type="button"
              aria-pressed={filter === status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1 rounded-full font-medium border cursor-pointer ${filter === status
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              {status}
            </button>
          ),
        )}
      </div>
      {
        filter === "All"
          ? allTasks
          : allTasks.filter((task) => task.status === filter)
          }
      return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="New task..."
            className="border px-3 py-1 rounded w-full"
          />

          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>


        <div className="flex gap-2 mb-6">
          {["All", "Completed", "In Progress", "Pending"].map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={filter === status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1 rounded-full font-medium border cursor-pointer ${filter === status
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <TaskList tasks={filteredTasks} onDelete={deleteTasks} view={view} />
      </div>
      )
    </>
  );

}