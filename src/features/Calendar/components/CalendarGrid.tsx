import DayCell from "./DayCell";

type Props = {
  currentDate: Date;
  openModal: (day: number) => void;
  events: any[];
  handleDelete: (id: number) => void;
};

const CalendarGrid: React.FC<Props> = ({
  currentDate,
  openModal,
  events,
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
            openModal={openModal}
            isToday={isToday(day)}
            events={events}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;