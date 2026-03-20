import { createContext, useContext, useState } from "react";

type Event = {
  id: string;
  date: string;
  title: string;
};

type CalendarContextType = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  currentDate: Date;
  events: Event[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{ selectedDate, setSelectedDate, currentDate, events, addEvent, deleteEvent }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used inside CalendarProvider");
  return context;
};