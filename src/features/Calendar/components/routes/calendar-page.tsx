import React from "react";
import EventCard from "../event-card";
import { events } from "../data/events";

// const events = [
//   { id: 1, title: "Meeting", date: "2023-03-15" },
//   { id: 2, title: "Project Deadline", date: "2023-03-16" },
//   { id: 3, title: "Client Presentation", date: "2023-03-17" }
// ];

export default function CalendarPage() {
    return (
        <div>
            <h1>Calendar and Upcoming Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <EventCard title={event.title} date={event.date} description={event.description} />
                    </li>
                ))}
            </ul>
        </div>
    )
}