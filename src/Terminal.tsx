import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { type Stats } from './data'

type Line = { prompt?: boolean; text: ReactNode }

const PROMPT = (
  <>
    <span className="hidden sm:inline">
      <span className="text-emerald-400">WarLikeLaux</span>
      <span className="text-zinc-600">@</span>
      <span className="text-sky-400">portfolio</span>
      <span className="text-zinc-600">:~</span>
    </span>
    <span className="text-emerald-400 sm:text-zinc-600">$</span>{' '}
  </>
)

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function link(href: string, text: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-emerald-400 underline-offset-2 hover:underline"
    >
      {text}
    </a>
  )
}

export default function Terminal({ stats }: { stats: Stats }) {
  const [history, setHistory] = useState<Line[]>([])
  const [typed, setTyped] = useState('')
  const [booting, setBooting] = useState(true)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // boot sequence — печатает команды по буквам, выводит результат построчно
  useEffect(() => {
    let cancelled = false
    const steps = [
      { cmd: 'whoami', out: ['Евгений Федотов · PHP backend developer'] },
      {
        cmd: 'cat stats.json',
        out: [
          '{',
          `  "years_in_it":  ${stats.yearsInIT},`,
          `  "years_in_dev": ${stats.yearsInDev},`,
          `  "age":          ${stats.age},`,
          `  "focus":        "backend",`,
          `  "stack":        ["PHP", "Yii2", "Laravel"],`,
          `  "remote":       true`,
          '}',
        ],
      },
    ]

    async function run() {
      await sleep(450)
      if (cancelled) return
      for (const step of steps) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return
          setTyped(step.cmd.slice(0, i))
          await sleep(55)
        }
        await sleep(220)
        if (cancelled) return
        setHistory((h) => [
          ...h,
          { prompt: true, text: step.cmd },
          ...step.out.map((o) => ({ text: o })),
        ])
        setTyped('')
        await sleep(320)
      }
      if (cancelled) return
      setHistory((h) => [
        ...h,
        { text: <span className="text-zinc-600">Введите <span className="text-zinc-300">help</span> — список команд</span> },
      ])
      setBooting(false)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [stats])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, typed])

  useEffect(() => {
    if (!booting) inputRef.current?.focus()
  }, [booting])

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim()
    const out: Line[] = [{ prompt: true, text: cmd }]
    const push = (lines: ReactNode[]) => lines.forEach((t) => out.push({ text: t }))

    switch (cmd.toLowerCase()) {
      case '':
        break
      case 'help':
        push([
          'whoami     Кто я',
          'telegram   Написать мне',
          'github     Мой код',
          'clear      Очистить экран',
        ])
        break
      case 'whoami':
        push(['Евгений Федотов · PHP backend developer'])
        break
      case 'telegram':
        push([<>→ {link('https://t.me/teagamesen', 't.me/teagamesen')}</>])
        break
      case 'github':
        push([<>→ {link('https://github.com/WarLikeLaux', 'github.com/WarLikeLaux')}</>])
        break
      case 'clear':
        setHistory([])
        return
      case 'sudo':
        push(['sudo: permission denied'])
        break
      default:
        push([
          <span className="text-rose-400">command not found: {cmd}</span>,
          <span className="text-zinc-600">Введите help</span>,
        ])
    }

    setHistory((h) => [...h, ...out])
  }, [])

  return (
    <div
      className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/40 transition-colors focus-within:border-zinc-700"
      onClick={() => !booting && inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 min-w-0 truncate font-mono text-xs text-zinc-500">WarLikeLaux@portfolio: ~</span>
      </div>

      <div ref={scrollRef} className="h-72 overflow-x-hidden overflow-y-auto p-5 font-mono text-sm leading-relaxed">
        {history.map((line, i) => (
          <p key={i} className={line.prompt ? 'break-words text-zinc-200' : 'whitespace-pre-wrap break-words text-zinc-400'}>
            {line.prompt ? <>{PROMPT}{line.text}</> : line.text}
          </p>
        ))}

        {booting ? (
          <p className="break-words text-zinc-200">
            {PROMPT}{typed}
            <span className="cursor-blink text-emerald-400">▊</span>
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCommand(input)
              setInput('')
            }}
            className="flex"
          >
            <span className="shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ml-2 min-w-0 flex-1 bg-transparent text-zinc-200 caret-emerald-400 outline-none"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </form>
        )}
      </div>
    </div>
  )
}
