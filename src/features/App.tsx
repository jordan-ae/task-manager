import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./Calendar/routes/calendar-page";
import Navbar from "./components/layout/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;