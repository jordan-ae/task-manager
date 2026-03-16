import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Task Manager</div>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Calendar
        </NavLink>
      </div>
    </nav>
  );
}