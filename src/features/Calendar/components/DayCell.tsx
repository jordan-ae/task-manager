import type { Event } from "../routes/calendar-page";
import DeleteButton from "./DeleteButton";

type Props = {
  day: number;
  currentDate: Date;
  events: Event[];
  openModal: (day: number) => void;
  handleDelete: (id: number) => void;
  isToday: boolean;
};

const DayCell: React.FC<Props> = ({
  day,
  currentDate,
  events,
  openModal,
  handleDelete,
  isToday,
}) => {
  const dayEvents = events.filter(
    (e) =>
      new Date(e.date).getDate() === day &&
      new Date(e.date).getMonth() === currentDate.getMonth()
  );

  return (
    <div
      onClick={() => openModal(day)}
      className={`p-2 rounded-lg min-h-[100px] border cursor-pointer ${
        isToday ? "bg-yellow-200" : "bg-white"
      }`}
    >
      <strong>{day}</strong>

      {dayEvents.map((event) => (
        <div
          key={event.id}
          className="mt-1 text-white text-xs px-2 py-1 rounded flex justify-between items-center"
          style={{ background: event.color || "#ea580c" }}
        >
          {event.title}

          <DeleteButton
            onClick={() => {
              // Prevent modal open by stopping event propagation
              // @ts-ignore
              window.event?.stopPropagation?.();
              handleDelete(event.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DayCell;