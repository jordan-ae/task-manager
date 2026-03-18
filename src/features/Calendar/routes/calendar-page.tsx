import React, { useState, useEffect } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  description?: string;
  color?: string;
};

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ea580c");

  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth();

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // ✅ FIXED openModal
  const openModal = (day?: number) => {
    if (day !== undefined) {
      setSelectedDay(day); // from calendar click
    } else {
      setSelectedDay(null); // from button → user must choose
    }
    setShowModal(true);
  };

  const handleAdd = () => {
    if (!title || selectedDay === null) return;

    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${selectedDay
      .toString()
      .padStart(2, "0")}`;

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date: formattedDate,
        time,
        description,
        color,
      },
    ]);

    setTitle("");
    setTime("");
    setDescription("");
    setColor("#ea580c");
    setSelectedDay(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // For calendar grid alignment
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysInMonth = getDaysInMonth();

  return (
    <div className="p-5 bg-orange-50 min-h-screen">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-orange-700 text-xl font-semibold">
          📅 Calendar
        </h2>

        <button
          onClick={() => openModal()}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          + Add Event
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => changeMonth(-1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>

        <h3 className="font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => changeMonth(1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Empty slots for first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div
            key={`blank-${i}`}
            className="p-2 border rounded min-h-[100px] bg-gray-50"
          ></div>
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dayEvents = events.filter(
            (e) =>
              new Date(e.date).getDate() === day &&
              new Date(e.date).getMonth() === currentDate.getMonth()
          );

          return (
            <div
              key={day}
              onClick={() => openModal(day)}
              className={`p-2 rounded-lg min-h-[100px] border cursor-pointer ${
                isToday(day) ? "bg-yellow-200" : "bg-white"
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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                    className="ml-2"
                    title="Delete event"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[300px]">
            <h3 className="font-semibold mb-2">
              Add Event {selectedDay && `(Day ${selectedDay})`}
            </h3>

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
                onClick={() => setShowModal(false)}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;