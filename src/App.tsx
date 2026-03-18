import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-linear-to-br from-stone-950 via-stone-900 to-orange-950 px-6 py-10 text-stone-50">
      <section className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Starter View</p>
          <h1 className="font-serif text-5xl tracking-[-0.05em] sm:text-6xl">
            Tailwind-powered React workspace.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-300">
            This leftover starter screen now uses Tailwind too, so the repo does not depend on the old `App.css`.
          </p>

          <button
            className="inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-orange-400"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-sky-400/10" />
          <div className="relative flex items-center justify-center gap-6">
            <img src={heroImg} className="h-40 w-auto" width="170" height="179" alt="" />
            <div className="grid gap-4">
              <img src={reactLogo} className="h-16 w-16" alt="React logo" />
              <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 text-sm text-stone-300">
            <p>Edit <code className="rounded bg-white/10 px-2 py-1 text-stone-100">src/App.tsx</code> to keep experimenting.</p>
            <a className="inline-flex w-fit rounded-full border border-white/15 px-4 py-2 hover:bg-white/10" href="https://react.dev/" target="_blank">
              React Docs
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
