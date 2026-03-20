import DayCell from "./DayCell";
import { useCalendar } from "../context/CalendarContext";

const CalendarGrid: React.FC = () => {
  const { currentDate, events, deleteEvent } = useCalendar();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-3">
      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
        <div key={i} className="bg-gray-50 min-h-[100px]" />
      ))}

      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;

        return (
          <DayCell
            key={day}
            day={day}
            isToday={isToday(day)}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;