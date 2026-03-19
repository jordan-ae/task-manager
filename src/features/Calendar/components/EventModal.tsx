type Props = {
  selectedDay: number | null;
  setSelectedDay: (day: number) => void;
  daysInMonth: number;

  title: string;
  setTitle: (val: string) => void;

  time: string;
  setTime: (val: string) => void;

  description: string;
  setDescription: (val: string) => void;

  color: string;
  setColor: (val: string) => void;

  handleAdd: () => void;
  closeModal: () => void;
};

const EventModal: React.FC<Props> = ({
  selectedDay,
  setSelectedDay,
  daysInMonth,
  title,
  setTitle,
  time,
  setTime,
  description,
  setDescription,
  color,
  setColor,
  handleAdd,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-[300px]">
        <h3 className="font-semibold mb-2">
          Add Event {selectedDay && `(Day ${selectedDay})`}
        </h3>

        <select
          value={selectedDay ?? ""}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="w-full p-2 mt-2 border rounded"
        >
          <option value="">Select Day</option>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-2"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-orange-600 text-white px-3 py-2 rounded mr-2"
          >
            Save
          </button>

          <button
            onClick={closeModal}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;