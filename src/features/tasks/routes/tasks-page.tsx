import { useState } from "react";
import TaskList from "../components/TaskList";

type Task = {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
};

type TaskFilter = "All" | Task["status"];

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
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filter, setFilter] = useState<TaskFilter>("All");
  const [view, setView] = useState<"list" | "card">("list");

  const addTask = () => {
    if (!taskTitle.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: taskTitle.trim(), status: "Pending" },
    ]);

    setTaskTitle("");
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  const deleteTasks = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="rounded bg-gray-100 p-6">
      <h1 className="mb-3 text-2xl font-bold uppercase tracking-[0.16em] text-orange-700">
        Tasks
      </h1>

      <div className="w-60 bg-amber-100 p-3">
        <p className="mb-3 text-lg font-semibold text-stone-950">
          Select your view mode
        </p>
        <button
          onClick={() => setView("list")}
          className={`mr-4 cursor-pointer rounded border px-3 py-1 font-semibold transition ${
            view === "list"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setView("card")}
          className={`cursor-pointer rounded border px-3 py-1 font-semibold transition ${
            view === "card"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          Card View
        </button>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-stone-800/10 bg-white/75 p-6 shadow-sm">
        <div className="mb-6 flex gap-2">
          {["All", "Completed", "In Progress", "Pending", "Overdue"].map(
            (status) => (
              <button
                key={status}
                type="button"
                aria-pressed={filter === status}
                onClick={() => setFilter(status as TaskFilter)}
                className={`cursor-pointer rounded-full border px-4 py-1 font-medium ${
                  filter === status
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>

        <div className="mb-4 flex gap-2">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="New task..."
            className="w-full rounded border px-3 py-1"
          />

          <button
            onClick={addTask}
            className="rounded bg-green-500 px-4 py-1 text-white"
          >
            Add
          </button>
        </div>

        <TaskList tasks={filteredTasks} onDelete={deleteTasks} view={view} />
      </div>
    </div>
  );

}
