import { LoginForm } from "../components/login-form";
// import { CircleCheckBig  } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen  flex">
      <div className="pointer-events-none absolute -left-24 bottom-[-6rem] h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[18%] top-[-5rem] h-72 w-72 rounded-full bg-white/60 blur-3xl" />

      <section className="w-1/2 bg-amber-900 from-stone-50 via-orange-50 to-amber-100 flex flex-col justify-center items-start p-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-500">
            {/* <CircleCheckBig size={24}  /> */}

          Task Manager
        </p>
        <h1 className="max-w-[12ch] font-serif text-5xl leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.4rem]">
          Join the <span className="text-orange-500">Productivity</span>{" "}
          Revolution.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300 lg:text-[1.05rem]">
          Keep tasks, deadlines, and priorities in one focused workspace built
          for fast daily check-ins.
        </p>

        <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_18px_40px_rgba(105,72,46,0.08)] backdrop-blur">
            <span className="mb-1 block font-sans text-[1.35rem] font-bold text-stone-200">
              Fast
            </span>
            <span className="block text-sm leading-6 text-stone-200">
              Quick access to today&apos;s work
            </span>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_18px_40px_rgba(105,72,46,0.08)] backdrop-blur">
            <span className="mb-1 block font-sans text-[1.35rem] font-bold text-stone-200">
              Clear
            </span>
            <span className="block text-sm leading-6 text-stone-200">
              A calmer view of what matters next
            </span>
          </div>
        </div>
      </section>

      <section className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-16">
        <div className="w-full max-w-md">
          <div>
            <p className="text-white text-2xl font-semibold mb-6">
              Welcome back
            </p>
            <h2 className="font-serif text-4xl leading-none tracking-[-0.04em] text-stone-600">
              Log in to continue
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Enter your details to open your workspace.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
