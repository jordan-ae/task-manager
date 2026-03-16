import React from "react";

type Status = "Active" | "Offline" | "Busy";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  status: Status;
  avatar: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "manga dorian",
    role: "Frontend Developer",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "lil sixteen",
    role: "Backend Developer",
    status: "Busy",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Sarah Smith",
    role: "UI Designer",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Project Manager",
    status: "Offline",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
            >

              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {member.role}
              </p>

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full text-white
                ${
                  member.status === "Active"
                    ? "bg-green-500"
                    : member.status === "Busy"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {member.status}
              </span>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}