export interface Event {
  id: number;
  title: string;
  date: string;       // e.g., "March 20, 2026"
  time?: string;      // optional, e.g., "10:00 AM"
  description?: string; // optional
  type?: "meeting" | "deadline" | "presentation"; // optional
}

// Dummy events data
export const events: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: "March 20, 2026",
    time: "10:00 AM",
    description: "Discuss project roadmap and assignments",
    type: "meeting",
  },
  {
    id: 2,
    title: "Project Deadline",
    date: "March 25, 2026",
    description: "Submit the first version of the UI",
    type: "deadline",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "March 28, 2026",
    time: "2:00 PM",
    description: "Present designs to the client",
    type: "presentation",
  },
];

export default events;