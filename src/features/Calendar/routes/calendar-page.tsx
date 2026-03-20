import React, { useState, useEffect } from "react";
import CalendarHeader from "../components/CalendarHeader";
import CalendarGrid from "../components/CalendarGrid";
import EventModal from "../components/EventModal";
import { CalendarProvider } from "../context/CalendarContext";

export type Event = {
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
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const openModal = (day?: number) => {
    setSelectedDay(day ?? null);
    setShowModal(true);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <CalendarProvider>
    <div className="p-5 bg-orange-50 min-h-screen">
      <CalendarHeader
        currentDate={currentDate}
        changeMonth={changeMonth}
        openModal={() => openModal()}
      />

      <CalendarGrid
        currentDate={currentDate}
        events={events}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {showModal && (
        <EventModal
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInMonth={daysInMonth}
          title={title}
          setTitle={setTitle}
          time={time}
          setTime={setTime}
          description={description}
          setDescription={setDescription}
          color={color}
          setColor={setColor}
          handleAdd={handleAdd}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
    </CalendarProvider>

  );
};

export default CalendarPage;