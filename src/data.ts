export const NAV = [
  { label: 'about', href: '#about' },
  { label: 'stack', href: '#stack' },
  { label: 'projects', href: '#projects' },
  { label: 'open-source', href: '#opensource' },
]

export const CONTACTS = [
  { label: 'telegram', href: 'https://t.me/teagamesen' },
  { label: 'github', href: 'https://github.com/WarLikeLaux' },
  { label: 'codewars', href: 'https://www.codewars.com/users/WarLikeLaux' },
  { label: 'stackoverflow', href: 'https://ru.stackoverflow.com/users/394231/warlikelaux' },
  { label: 'leetcode', href: 'https://leetcode.com/u/WarLikeLaux/' },
]

export const DOING = [
  { title: 'Легаси', text: 'Апгрейды PHP 5.6 → 8.x через Rector, выпиливание мёртвых зависимостей.' },
  { title: 'Перфоманс', text: 'Redis-кэш с инвалидацией через RabbitMQ, разбор N+1, денормализация.' },
  { title: 'Тесты', text: 'DI и сервисный слой, юнит/e2e, мутационное на критичных местах.' },
  { title: 'Процесс', text: 'AI-assisted разработка, CI/CD на GitLab, единое Docker-окружение.' },
]

export const STACK = [
  { label: 'backend', items: ['PHP 8', 'Yii2', 'Laravel'] },
  { label: 'базы · очереди · поиск', items: ['MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch', 'RabbitMQ'] },
  { label: 'frontend', items: ['jQuery', 'Vue 3', 'TypeScript', 'HTMX'] },
  { label: 'css', items: ['Bootstrap 4/5', 'Tailwind'] },
  { label: 'инфраструктура', items: ['Linux', 'Nginx', 'Docker', 'GitLab CI/CD'] },
  { label: 'ai-инструменты', items: ['Claude Code', 'Codex', 'Google AI Studio'] },
]

export const PROJECT_URL = 'https://github.com/WarLikeLaux/yii2-book-catalog'
export const PROJECT_TAGS = ['PHP 8.5', '100% Coverage', '100% MSI', 'Clean Architecture', 'DDD + CQS']
export const PROJECT_POINTS = [
  'Чистая архитектура: слои изолированы от фреймворка',
  'Гибридный поиск — FullText MySQL с откатом к LIKE',
  'Мультибаза MySQL / PostgreSQL с транзакциями',
  'Async fan-out для уведомлений через доменные события',
]

export const OTHER_PROJECTS = [
  { name: 'yii2-saas-sandbox', desc: 'стенд высоконагруженной SaaS-архитектуры', lang: 'PHP', href: 'https://github.com/WarLikeLaux/yii2-saas-sandbox' },
  { name: 'phew', desc: 'форматтер вьюшек Yii2', lang: 'Rust', href: 'https://github.com/WarLikeLaux/phew' },
  { name: 'strike-v', desc: 'трекер привычек', lang: 'Vue', href: 'https://github.com/WarLikeLaux/strike-v' },
  { name: 'leaas', desc: 'калькулятор стоимости жизни', lang: 'React', href: 'https://github.com/WarLikeLaux/leaas' },
  { name: 'bullet-heaven-ecs', desc: 'браузерная игра на ECS', lang: 'TypeScript', href: 'https://github.com/WarLikeLaux/bullet-heaven-ecs' },
  { name: 'smart-multi-timer', desc: 'мульти-таймер', lang: 'Python', href: 'https://github.com/WarLikeLaux/smart-multi-timer' },
]

const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
const BIRTH_DATE = new Date('1999-03-08')
const IT_START_DATE = new Date('2018-06-01')
const DEV_START_DATE = new Date('2020-10-01')
const IT_YEARS_OFFSET = 1

function yearsSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / MILLISECONDS_PER_YEAR)
}

export interface Stats {
  age: number
  yearsInIT: number
  yearsInDev: number
}

export function getStats(): Stats {
  return {
    age: yearsSince(BIRTH_DATE),
    yearsInIT: yearsSince(IT_START_DATE) + IT_YEARS_OFFSET,
    yearsInDev: yearsSince(DEV_START_DATE),
  }
}
