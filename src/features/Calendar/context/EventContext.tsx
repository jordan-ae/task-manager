import React, { createContext, useContext, useState, useEffect } from "react";

export type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  description?: string;
  color?: string;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
};

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used inside EventProvider");
  return context;
};