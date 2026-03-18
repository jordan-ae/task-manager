
interface TaskItemProps {
  title: string;
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "#22c55eb3";
    case "In Progress":
      return "#1d4ed8";
    case "Pending":
      return "#b45309";
    default:
      return "#475569";
  }
};

export default function TaskItem({ title, status }: TaskItemProps) {
  return (
    <div className="flex justify-between w-full grid-cols-[auto_1fr] items-center gap-3 rounded-2xl border border-orange-700/20 bg-orange-100/10 px-4 py-3.5 text-left shadow-sm transition duration-150 hover:bg-gray-50">
      <span>{title}</span>
      <span
        className="w-25 rounded-full p-1.5 text-center text-sm text-white"
        style={{ backgroundColor: getStatusColor(status) }}
      >
        {status}
      </span>
    </div>
  );
}
