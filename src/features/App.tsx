import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./Calendar/routes/calendar-page";
import Navbar from "./components/layout/navbar";
import { EventProvider } from "./Calendar/context/EventContext";

function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </EventProvider>
  );
}

export default App;