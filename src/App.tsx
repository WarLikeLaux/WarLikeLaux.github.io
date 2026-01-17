import { useState, useEffect, useMemo } from 'react'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  duration?: number
  start?: boolean
}

const ANIMATION_DELAY = 1500
const COUNTER_DURATION = 2000
const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25

const BIRTH_DATE = new Date('1999-03-08')
const IT_START_DATE = new Date('2018-06-01')
const DEV_START_DATE = new Date('2020-10-01')
const IT_YEARS_OFFSET = 2

function AnimatedNumber({ value, suffix = '', duration = COUNTER_DURATION, start = false }: AnimatedNumberProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    
    let startTime: number | null = null
    let animationFrameId: number
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [value, duration, start])

  return <>{count}{suffix}</>
}

function calculateYearsSince(date: Date): number {
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffYears = diffTime / MILLISECONDS_PER_YEAR
  return Math.floor(diffYears)
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [startCounter, setStartCounter] = useState(false)
  
  const { age, yearsInIT, yearsInDev } = useMemo(() => {
    const calculatedAge = calculateYearsSince(BIRTH_DATE)
    const calculatedYearsInIT = calculateYearsSince(IT_START_DATE) + IT_YEARS_OFFSET
    const calculatedYearsInDev = calculateYearsSince(DEV_START_DATE)
    
    return {
      age: calculatedAge,
      yearsInIT: calculatedYearsInIT,
      yearsInDev: calculatedYearsInDev
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setStartCounter(true)
    }, ANIMATION_DELAY)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-stone-50 dark:from-zinc-950 dark:via-slate-950 dark:to-stone-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="relative mb-8 pt-12 md:pt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-6">
              <a href="https://t.me/teagamesen" target="_blank" rel="noopener noreferrer" className={`flex-shrink-0 transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <img 
                    src="https://avatars.githubusercontent.com/u/48706973?v=4" 
                    alt="Евгений Федотов"
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl object-cover cursor-pointer"
                  />
                </div>
              </a>
              
              <div className="flex-1 text-center md:text-left">
                <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
                    Евгений Федотов
                  </h1>
                </div>
                
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 font-medium mb-6 leading-relaxed">
                    Превращаю сложную бизнес-логику в элегантные архитектурные решения на PHP
                  </p>
                </div>
                
                <div className={`flex flex-wrap items-center gap-4 justify-center md:justify-start transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <a href="https://t.me/teagamesen" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:scale-105 cursor-pointer">
                    Backend-focused PHP Developer
                  </a>
                  <div className="flex gap-3">
                    <a href="https://t.me/teagamesen" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" aria-label="Telegram">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a href="mailto:warlikelaux080399@mail.ru" className="text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors" aria-label="Email">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a href="https://github.com/WarLikeLaux" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors" aria-label="GitHub">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.codewars.com/users/WarLikeLaux" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" aria-label="Codewars">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </a>
                    <a href="https://ru.stackoverflow.com/users/394231/warlikelaux" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" aria-label="Stack Overflow">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.292 19.925l-3.217-3.211L13.507 15l3.211 3.212-1.426 1.713zM19.855 13.646l-1.431-1.43 3.212-3.213 1.43 1.43-3.211 3.213zM12.97 3.627l-1.43 1.43-3.212 3.212 1.43 1.43 3.212-3.212zm4.283 4.282l-1.43 1.43-3.212-3.211 1.43-1.431 3.212 3.212zm2.567 1.64c0-.15-.012-.302-.037-.453l-2.115-2.114-1.43 1.43 2.114 2.115c.14.025.293.037.443.037.828 0 1.5-.672 1.5-1.5 0-.15-.012-.302-.037-.452l2.115-2.115-1.43-1.43-2.115 2.114c-.14-.025-.293-.037-.443-.037-.828 0-1.5.672-1.5 1.5 0 .15.012.302.037.453l-2.115 2.114 1.43 1.43 2.114-2.115c.14.025.293.037.443.037.828 0 1.5-.672 1.5-1.5zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={`flex-shrink-0 w-full md:w-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="group relative bg-gradient-to-br from-emerald-500/25 via-teal-500/25 to-cyan-500/25 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40 backdrop-blur-lg rounded-2xl p-4 border-2 border-emerald-400/60 dark:border-emerald-600/60 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/10 rounded-tr-full blur-xl"></div>
                  <div className="relative space-y-3">
                    <div className="flex items-baseline gap-2">
                      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        <AnimatedNumber value={yearsInIT} suffix="+" start={startCounter} />
                      </div>
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">лет в IT</div>
                    </div>
                    <div className="h-0.5 bg-gradient-to-r from-emerald-400/30 via-teal-400/50 to-cyan-400/30 dark:from-emerald-600/30 dark:via-teal-600/50 dark:to-cyan-600/30 rounded-full"></div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                        <AnimatedNumber value={yearsInDev} suffix="+" start={startCounter} />
                      </div>
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">лет в разработке</div>
                    </div>
                    <div className="h-0.5 bg-gradient-to-r from-teal-400/30 via-cyan-400/50 to-blue-400/30 dark:from-teal-600/30 dark:via-cyan-600/50 dark:to-blue-600/30 rounded-full"></div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        <AnimatedNumber value={age} start={startCounter} />
                      </div>
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">лет</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            <div className={`group relative overflow-hidden bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-rose-500/30 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-rose-900/40 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-400/70 dark:border-purple-500/70 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-bl-full blur-2xl group-hover:bg-purple-400/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/20 rounded-tr-full blur-2xl group-hover:bg-rose-400/30 transition-colors"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-purple-500/40 text-purple-900 dark:text-purple-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">PHP</span>
                  <span className="px-2.5 py-1.5 bg-pink-500/40 text-pink-900 dark:text-pink-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Yii2</span>
                  <span className="px-2.5 py-1.5 bg-rose-500/40 text-rose-900 dark:text-rose-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Laravel</span>
                  <span className="px-2.5 py-1.5 bg-amber-500/40 text-amber-900 dark:text-amber-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">RabbitMQ</span>
                </div>
              </div>
            </div>
            
            <div className={`group relative overflow-hidden bg-gradient-to-br from-blue-500/30 via-indigo-500/30 to-purple-500/30 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 backdrop-blur-md rounded-3xl p-6 border-2 border-blue-400/70 dark:border-blue-500/70 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Базы данных
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-blue-500/30 text-blue-900 dark:text-blue-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">MySQL</span>
                  <span className="px-2.5 py-1.5 bg-indigo-500/30 text-indigo-900 dark:text-indigo-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Redis</span>
                  <span className="px-2.5 py-1.5 bg-violet-500/30 text-violet-900 dark:text-violet-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Elasticsearch</span>
                </div>
              </div>
            </div>
            
            <div className={`group relative overflow-hidden bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-teal-500/30 dark:from-cyan-900/40 dark:via-blue-900/40 dark:to-teal-900/40 backdrop-blur-md rounded-3xl p-6 border-2 border-cyan-400/70 dark:border-cyan-500/70 hover:border-cyan-300 dark:hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Инфраструктура
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-cyan-500/40 text-cyan-900 dark:text-cyan-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Docker</span>
                  <span className="px-2.5 py-1.5 bg-blue-500/40 text-blue-900 dark:text-blue-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Nginx</span>
                  <span className="px-2.5 py-1.5 bg-teal-500/40 text-teal-900 dark:text-teal-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Linux</span>
                  <span className="px-2.5 py-1.5 bg-sky-500/40 text-sky-900 dark:text-sky-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">CI/CD</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`group relative overflow-hidden bg-gradient-to-br from-emerald-500/30 via-teal-500/30 to-cyan-500/30 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40 backdrop-blur-md rounded-3xl p-8 border-2 border-emerald-400/70 dark:border-emerald-500/70 hover:border-emerald-300 dark:hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all mb-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex-1">
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-500 transition-all inline-block mb-4">
                    yii2-book-catalog
                  </div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1.5 bg-emerald-500/30 text-emerald-800 dark:text-emerald-200 rounded-xl text-sm font-bold">100% Coverage</span>
                    <span className="px-3 py-1.5 bg-teal-500/30 text-teal-800 dark:text-teal-200 rounded-xl text-sm font-bold">100% MSI</span>
                    <span className="px-3 py-1.5 bg-cyan-500/30 text-cyan-800 dark:text-cyan-200 rounded-xl text-sm font-bold">Clean Architecture</span>
                    <span className="px-3 py-1.5 bg-blue-500/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-bold">DDD + CQRS</span>
                    <span className="px-3 py-1.5 bg-purple-500/30 text-purple-800 dark:text-purple-200 rounded-xl text-sm font-bold">Highload ready</span>
                  </div>
                </div>
                <a href="https://github.com/WarLikeLaux/yii2-book-catalog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>Посмотреть код</span>
                </a>
              </div>
              <ul className="space-y-2 text-lg text-slate-700 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Реализация Clean Architecture с четким разделением слоев и изоляцией бизнес-логики</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Гибридный поиск: FullText MySQL с откатом к LIKE для надежности</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Мультибаза данных (MySQL/PostgreSQL) с поддержкой транзакций</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Async Fan-out паттерн для масштабируемых уведомлений через доменные события</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CAS Storage (Content-Addressable Storage) для файлов и Value Objects для бизнес-правил</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PJAX для мгновенной фильтрации и HTMX для интерактивности без перезагрузки</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <div className={`group relative overflow-hidden bg-gradient-to-br from-blue-500/30 via-sky-500/30 to-cyan-500/30 dark:from-blue-900/40 dark:via-sky-900/40 dark:to-cyan-900/40 backdrop-blur-md rounded-3xl p-6 border-2 border-blue-400/70 dark:border-blue-500/70 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/15 to-cyan-400/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-emerald-500/30 text-emerald-900 dark:text-emerald-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Vue.js 3</span>
                  <span className="px-2.5 py-1.5 bg-blue-500/30 text-blue-900 dark:text-blue-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">TypeScript</span>
                  <span className="px-2.5 py-1.5 bg-cyan-500/30 text-cyan-900 dark:text-cyan-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">React</span>
                  <span className="px-2.5 py-1.5 bg-teal-500/30 text-teal-900 dark:text-teal-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">HTMX</span>
                </div>
              </div>
            </div>
            
            <div className={`group relative overflow-hidden bg-gradient-to-br from-pink-500/30 via-rose-500/30 to-fuchsia-500/30 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-fuchsia-900/40 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-400/70 dark:border-pink-500/70 hover:border-pink-300 dark:hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '650ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/15 to-rose-400/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  CSS
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-pink-500/40 text-pink-900 dark:text-pink-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Bootstrap 4/5</span>
                  <span className="px-2.5 py-1.5 bg-rose-500/40 text-rose-900 dark:text-rose-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Tailwind</span>
                </div>
              </div>
            </div>
            
            <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-500/30 via-gray-500/30 to-zinc-500/30 dark:from-slate-800/40 dark:via-gray-800/40 dark:to-zinc-800/40 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-400/70 dark:border-slate-500/70 hover:border-slate-300 dark:hover:border-slate-400 hover:shadow-2xl hover:shadow-slate-500/30 transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/15 to-gray-400/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-black text-2xl mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Доп. навыки
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1.5 bg-blue-500/30 text-blue-900 dark:text-blue-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Python</span>
                  <span className="px-2.5 py-1.5 bg-sky-500/30 text-sky-900 dark:text-sky-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">FastAPI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default App
