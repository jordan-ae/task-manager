import DayCell from "./DayCell";

type Props = {
  currentDate: Date;
  events: Event[];
  openModal: (day: number) => void;
  handleDelete: (id: number) => void;
};

const CalendarGrid: React.FC<Props> = ({
  currentDate,
  events,
  openModal,
  handleDelete,
}) => {
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
            currentDate={currentDate}
            events={events}
            openModal={openModal}
            handleDelete={handleDelete}
            isToday={isToday(day)}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;