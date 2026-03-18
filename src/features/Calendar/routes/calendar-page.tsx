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

  // Load events
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // Save events
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // 🔥 Open modal from button
  const openAddModal = () => {
    setSelectedDay(new Date().getDate());
    setShowModal(true);
  };

  const handleAdd = () => {
    if (!title || selectedDay === null) return;

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDay
    );

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date: newDate.toISOString(),
        time,
        description,
        color,
      },
    ]);

    // reset
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

  return (
    <div style={container}>
      <h2 style={header}>📅 Calendar</h2>

      {/* Month Navigation */}
      <div style={nav}>
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <h3>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>

      {/* Add Event Button */}
      <button onClick={openAddModal} style={addBtn}>
        Add Event
      </button>

      {/* Calendar Grid */}
      <div style={grid}>
        {Array.from({ length: getDaysInMonth() }, (_, i) => i + 1).map(
          (day) => {
            const dayEvents = events.filter(
              (e) =>
                new Date(e.date).getDate() === day &&
                new Date(e.date).getMonth() === currentDate.getMonth()
            );

            return (
              <div
                key={day}
                style={{
                  ...dayBox,
                  background: isToday(day) ? "#fde68a" : "#fff",
                }}
              >
                <strong>{day}</strong>

                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      ...eventItem,
                      background: event.color || "#ea580c",
                    }}
                  >
                    {event.title}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event.id);
                      }}
                      style={deleteBtn}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            );
          }
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h3>Add Event</h3>

            {/* Day Selector */}
            <select
              value={selectedDay || ""}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              style={input}
            >
              <option value="">Select Day</option>
              {Array.from(
                { length: getDaysInMonth() },
                (_, i) => i + 1
              ).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={input}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={input}
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={input}
            />

            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAdd} style={addBtn}>
                Save
              </button>
              <button onClick={() => setShowModal(false)}>
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

//
// 🎨 Styles
//

const container: React.CSSProperties = {
  padding: "20px",
  background: "#f6efe7",
  minHeight: "100vh",
};

const header: React.CSSProperties = {
  color: "#b45309",
};

const nav: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "10px",
};

const dayBox: React.CSSProperties = {
  padding: "10px",
  borderRadius: "10px",
  minHeight: "100px",
  border: "1px solid #f1e5d9",
};

const eventItem: React.CSSProperties = {
  marginTop: "5px",
  color: "#fff",
  padding: "5px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
};

const deleteBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const modalOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const addBtn: React.CSSProperties = {
  background: "#ea580c",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer",
};