type Props = {
  currentDate: Date;
  changeMonth: (offset: number) => void;
  openModal: () => void;
};

const CalendarHeader: React.FC<Props> = ({
  currentDate,
  changeMonth,
  openModal,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-orange-700 text-xl font-semibold">
          📅 Calendar
        </h2>

        <button
          onClick={openModal}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Event
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <button onClick={() => changeMonth(-1)}>Prev</button>

        <h3>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
    </>
  );
};

export default CalendarHeader;