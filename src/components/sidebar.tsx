import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../features/auth/auth-context";

type SidebarItem = {
    icon: string;
    name: string;
    active?: boolean;
    path: string;
};

const navItems: SidebarItem[] = [
    { icon: "OV", name: "Overview", path: "/" },
    { icon: "TK", name: "Tasks", path: "/tasks" },
    { icon: "CL", name: "Calendar", path: "/calendar" },
    { icon: "TM", name: "Teams", path: "/teams" },
];

export function Sidebar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    auth?.isAuthenticated

    if (!auth) {
        throw new Error("Sidebar must be used within AuthProvide");
    }

    const { logout, userName } = auth;

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <aside className="flex min-h-0 flex-col gap-5 rounded-[1.75rem] border border-stone-800/10 bg-gradient-to-b from-white/90 to-orange-50/80 p-6 shadow-[0_24px_70px_rgba(77,47,25,0.14)] backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row xl:items-start">
                <div className="flex items-center gap-4">
                    <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-orange-800 font-sans text-base font-bold tracking-[0.12em] text-orange-50 shadow-[0_12px_28px_rgba(148,65,27,0.25)]">
                        TM
                    </div>
                    <div>
                        <p className="mb-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-orange-700">Workspace</p>
                        <h1 className="font-serif text-2xl tracking-[-0.03em] text-stone-950">Task Manager</h1>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-green-700/10 bg-green-50/90 px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-green-800">
                    <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_0_0.24rem_rgba(79,156,73,0.14)]" />
                    Online
                </div>
            </div>

            <div className="rounded-[1.4rem] border border-orange-700/15 bg-gradient-to-br from-orange-100/60 to-white/90 p-5">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-orange-700">Today</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/80 p-4">
                        <p className="font-serif text-3xl leading-none text-stone-950">12</p>
                        <p className="mt-1 text-xs text-stone-500">Tasks done</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-4">
                        <p className="font-serif text-3xl leading-none text-stone-950">3</p>
                        <p className="mt-1 text-xs text-stone-500">Meetings</p>
                    </div>
                </div>
            </div>

            <section className="grid gap-3">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-orange-700">Navigation</p>
                <nav className="grid gap-2" aria-label="Sidebar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                [
                                    "grid w-full grid-cols-[auto_1fr] items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition duration-150",
                                    isActive
                                        ? "border-orange-700/20 bg-orange-100/70"
                                        : "border-transparent bg-white/60 hover:border-orange-700/10 hover:bg-white/90",
                                ].join(" ")
                            }
                            type="button"
                        >
                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-orange-800 text-[0.76rem] font-bold tracking-[0.08em] text-orange-50">
                                {item.icon}
                            </span>
                            <span className="font-sans text-[0.96rem] font-bold leading-5 text-stone-950">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </section>

            <div className="mt-auto border-t border-stone-800/10 pt-4">
                <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-orange-800 text-sm font-bold text-orange-50 shadow-[0_12px_28px_rgba(148,65,27,0.25)]">
                        {userName.slice(0, 2).toUpperCase() || "TM"}
                    </div>
                    <div>
                        <p className="font-sans text-[0.96rem] font-bold text-stone-950">
                            {userName || "Task Manager User"}
                        </p>
                        <p className="mt-1 text-sm text-stone-500">Admin workspace</p>
                    </div>
                </div>

                <button
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-stone-800/10 bg-white/70 px-4 py-3 text-sm font-semibold text-stone-700 transition duration-150 hover:-translate-y-0.5 hover:bg-white"
                    onClick={handleLogout}
                    type="button"
                >
                    Log out
                </button>
            </div>
        </aside>
    );
}
