import React from "react";
import EventCard from "../event-card";
import { events } from "../data/events";

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