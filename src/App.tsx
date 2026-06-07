import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Terminal from './Terminal'
import {
  NAV,
  DOING,
  STACK,
  PROJECT_URL,
  PROJECT_TAGS,
  PROJECT_POINTS,
  OTHER_PROJECTS,
  getStats,
} from './data'

const CARD_GLOW =
  'transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.35)]'

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Heading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-8 scroll-mt-24 font-mono text-sm text-emerald-400">
      <span className="text-zinc-600">#</span> {children}
    </h2>
  )
}

function App() {
  const stats = useMemo(getStats, [])

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-zinc-300 antialiased selection:bg-emerald-500/30">
      {/* живой фон: тех-паттерн + затемнение + свечение */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-[url('/bg.png')] bg-cover bg-center bg-fixed opacity-70" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-[#0a0a0b]/80" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-glow" />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-[#0a0a0b]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm text-zinc-200 transition-colors hover:text-emerald-400">
            <span className="text-emerald-400">~/</span>WarLikeLaux
          </a>
          <nav className="hidden items-center gap-7 font-mono text-sm sm:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-zinc-500 transition-colors hover:text-emerald-400">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/WarLikeLaux"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              github
            </a>
            <a
              href="https://t.me/teagamesen"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-emerald-500/40 px-3 py-1.5 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
            >
              telegram
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-6">

        {/* hero */}
        <section className="flex flex-col gap-10 py-12 md:flex-row md:items-center md:gap-12 md:py-16">
          <div className="flex-1">
            <p className="font-mono text-sm text-emerald-400">PHP backend developer</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-zinc-50 md:text-6xl">
              Евгений<br />Федотов
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
              Делаю серверную часть для интернет-магазинов, CRM и PIM-систем — чистая
              архитектура, тесты и легаси, приведённый в порядок.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://t.me/teagamesen"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-emerald-500 px-5 py-2.5 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
              >
                написать в telegram
              </a>
              <a
                href="https://github.com/WarLikeLaux"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              >
                github
              </a>
            </div>
          </div>

          <div className="w-full max-w-md flex-1">
            <Terminal stats={stats} />
            <p className="mt-3 text-center font-mono text-xs text-zinc-600">
              терминал живой — попробуй <span className="text-zinc-400">help</span>
            </p>
          </div>
        </section>

        {/* about */}
        <section className="border-t border-zinc-900 py-12 md:py-14">
          <Reveal>
            <Heading id="about">about</Heading>
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
              Девять лет в IT: начинал с техподдержки и серверов, теперь пишу бэкенд для
              интернет-магазинов, CRM и PIM-систем. Люблю наводить порядок в легаси —
              вынести логику из распухших контроллеров и закрыть тестами то, что раньше
              боялись трогать. Беру технологию не ради хайпа, а ту, что переживёт прод.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DOING.map((d) => (
                <div key={d.title} className={`rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 ${CARD_GLOW}`}>
                  <h3 className="font-mono text-sm text-zinc-100">
                    <span className="mr-2 text-emerald-500/80">›</span>{d.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{d.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* stack */}
        <section className="border-t border-zinc-900 py-12 md:py-14">
          <Reveal>
            <Heading id="stack">stack</Heading>
            <div className="space-y-6">
              {STACK.map((group) => (
                <div key={group.label} className="flex flex-col gap-2.5 sm:flex-row sm:gap-6">
                  <div className="w-full shrink-0 font-mono text-xs uppercase tracking-wider text-zinc-600 sm:w-56 sm:pt-1.5">
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-zinc-800 bg-zinc-900/40 px-3 py-1 font-mono text-sm text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* projects */}
        <section className="border-t border-zinc-900 py-12 md:py-14">
          <Reveal>
            <Heading id="projects">projects</Heading>

            <a
              href={PROJECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 ${CARD_GLOW}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="font-mono text-xl font-semibold text-zinc-50 transition-colors group-hover:text-emerald-400">
                    yii2-book-catalog
                  </span>
                  <p className="mt-2 text-sm text-zinc-500">
                    Показательный проект: как я делаю чистую архитектуру на Yii 2.
                  </p>
                </div>
                <span className="shrink-0 self-start rounded-md border border-zinc-700 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors group-hover:border-emerald-500/50 group-hover:text-emerald-400">
                  GitHub →
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {PROJECT_TAGS.map((tag) => (
                  <span key={tag} className="rounded border border-zinc-700 px-2 py-0.5 font-mono text-xs text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-zinc-400 sm:grid-cols-2">
                {PROJECT_POINTS.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="select-none font-mono text-emerald-500/70">▍</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </a>

            <p className="mt-8 mb-5 font-mono text-xs uppercase tracking-wider text-zinc-600">
              ещё на github
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 ${CARD_GLOW}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-sm text-zinc-200 transition-colors group-hover:text-emerald-400">
                      {p.name}
                    </span>
                    <span className="font-mono text-xs text-zinc-600">{p.lang}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-zinc-400">{p.desc}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  )
}

export default App
