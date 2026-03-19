import { events } from "../data/events";

interface EventCardProps {
  title: string;
  date: string;
  description?: string; // optional
}

export default function EventCard({ title, date, description }: EventCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{date}</p>
      {description && <p className="mt-2 text-gray-800">{description}</p>}
    </div>
  );
}

