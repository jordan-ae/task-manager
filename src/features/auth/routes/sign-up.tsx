import { SignUpForm } from "../components/sign-up";

export function SignUpPage() {
    return (
        <main className=" min-h-screen flex">
            <div className="pointer-events-none absolute left-[-5rem] top-[-4rem] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-6rem] right-[-3rem] h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />

            <section className="w-1/2 bg-amber-900 from-stone-50 via-orange-50 to-amber-100 flex flex-col justify-center items-start p-16">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">Task Master</p>
                <h1 className="max-w-[11ch] font-serif text-5xl leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.2rem]">
                    Join the <span className="text-orange-500">Productive</span> Revolution
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300 lg:text-[1.05rem]">
                    Stop juggling and start finising. TaskMaster brings your goals, your team, and your deadlines
                    into one unified workspace.
                </p>

                <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <span className="block text-2xl font-bold text-white">01</span>
                        <p className="mt-2 text-sm leading-6 text-stone-300">Create your account and keep your work synced across refreshes.</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <span className="block text-2xl font-bold text-white">02</span>
                        <p className="mt-2 text-sm leading-6 text-stone-300">Track tasks, deadlines, and team momentum from one dashboard.</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                        <span className="block text-2xl font-bold text-white">03</span>
                        <p className="mt-2 text-sm leading-6 text-stone-300">Stay focused with a calmer workflow designed for daily execution.</p>
                    </div>
                </div>
            </section>
                
                <section className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-16">
                <div className="w-full max-w-lg rounded-[1.8rem] border border-white/10  p-8 text-left shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">Join Task Manager</p>
                        <h2 className="font-serif text-4xl leading-none tracking-[-0.04em] text-stone-400">
                            Create your account
                        </h2>
                        {/* <p className="mt-4 text-base leading-7 text-stone-600">
                            Tell us a little about you and we&apos;ll open your workspace right away.
                        </p> */}
                    </div>
                    <SignUpForm />
                </div>
            </section>
        </main>
    )
}
