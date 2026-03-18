import TaskList from '../../tasks/components/TaskList'
import { dummyTasks } from '../../tasks/routes/tasks-page';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from '../../../components/ui/sonner';
import { Button } from '@/components/ui/button';

export function Home() {
    const completedCount = dummyTasks.filter(task => task.status === "Completed").length;
    const inProgressCount = dummyTasks.filter(task => task.status === "In Progress").length;
    const pendingCount = dummyTasks.filter(task => task.status === "Pending").length;

    useEffect(() => {
        toast.success("Welcome to Task Manager", {
            description: "This  TaskFlow app to organise your tasks"
        })
    }, [])

    return (
        <>
            <section className="space-y-8 p-8 text-left lg:p-10">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Overview</p>
                    <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] text-stone-800 sm:text-4xl">
                        TaskFlow — Stay Organized, Get Things Done
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
                        A simple dashboard that lets users add and manage tasks effortlessly.
                        Tasks are organized by status—Pending, In Progress, and Completed—for clear tracking and productivity.
                    </p>
                </div>

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
                    <div className="rounded-[1.75rem] border border-stone-800/10 bg-white/75 p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Priority Board</p>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            <article className="rounded-3xl bg-green-100/70 p-5">
                                <p className="text-sm font-semibold text-green-500/70">Completed Task</p>
                                <p className="mt-2 text-sm leading-6 text-stone-500"> <span className="text-3xl text-green-500/70 font-extrabold">{completedCount}</span> <br /> These are the task completed.</p>
                            </article>
                            <article className="rounded-3xl bg-blue-100 p-5">
                                <p className="text-sm font-semibold text-blue-600/70">InProgress Task</p>
                                <p className="mt-2 text-sm leading-6 text-stone-500"><span className="text-3xl text-blue-600/70 font-extrabold">{inProgressCount}</span> <br /> These are the tasks currently in the progress state.</p>
                            </article>
                            <article className="rounded-3xl bg-red-100/70 p-5">
                                <p className="text-sm font-semibold text-red-800/90">Pending Task</p>
                                <p className="mt-2 text-sm leading-6 text-stone-500"><span className="text-3xl text-red-800/90 font-extrabold">{pendingCount}</span> <br /> These are the current pending tasks in the stack </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-stone-800/10 bg-linear-to-br from-red-950 to-red-900/70 p-6 text-stone-50 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-300">Team Load</p>
                        <p className="mt-3 text-6xl leading-none">86%</p>
                        <p className="mt-3 text-sm leading-6 text-stone-300">
                            Delivery is on track, but one stream is approaching capacity. Rebalance after the afternoon review.
                        </p>
                        <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-[86%] rounded-full bg-linear-to-r from-orange-400 to-amber-200" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-8xl px-8 py-10 lg:px-10">
                <div className="rounded-[1.75rem] border border-stone-800/10 bg-white/75 p-6 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Upcoming Tasks</p>
                    <div className="mt-5">
                        <TaskList tasks={dummyTasks} onDelete={() => {}} view='list' />
                    </div>
                </div>

                <div className="rounded-[1.75rem] border border-stone-800/10 bg-white/75 p-6 shadow-sm my-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700">Upcoming Events</p>
                    <div className="mt-5">
                        <p>No Current Event coming up</p>
                    </div>
                </div>
            </section>

            <Toaster
                position="top-right"
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: "bg-orange-100/50 border-1 border-orange-700/50 text-black p-4 rounded-lg shadow-lg flex items-center gap-2",
                        description: "!text-emerald-950/50 text-xs",
                        actionButton: "text-black",
                    },
                }}
                visibleToasts={1}
                expand={false}
            />
        </>
    )
}