import React from "react";

type Activity = {
  id: number;
  action: string;
  date: string;
};

const activities: Activity[] = [
  { id: 1, action: "User John created an account", date: "2026-03-14" },
  { id: 2, action: "New order placed", date: "2026-03-15" },
  { id: 3, action: "Profile updated", date: "2026-03-16" },
];

const cardStyle: React.CSSProperties = {
  background: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const Overview: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Welcome back 👋</h1>
      <p>Here's a quick overview of your dashboard.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>

        <div style={cardStyle}>
          <h3>Orders</h3>
          <p>320</p>
        </div>

        <div style={cardStyle}>
          <h3>Revenue</h3>
          <p>$12,430</p>
        </div>

        <div style={cardStyle}>
          <h3>Active Sessions</h3>
          <p>87</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Activity</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.action} — <small>{activity.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;