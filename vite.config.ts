import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


type DemoUserSummary = {
  id: string
  name: string
  email: string
  role: string
  team: string
  location: string
  status: 'online' | 'focus' | 'offline'
  plan: string
  initials: string
  avatarColor: string
}

type DemoUserRecord = DemoUserSummary & {
  bio: string
  timezone: string
  settings: {
    notifications: {
      email: boolean
      push: boolean
      weeklyDigest: boolean
    }
    workspace: {
      startPage: string
      showCompletedTasks: boolean
      timeFormat: '12h' | '24h'
    }
    appearance: {
      theme: 'light' | 'dark' | 'system'
      density: 'comfortable' | 'compact'
    }
  }
  stats: {
    openTasks: number
    completedThisWeek: number
    focusScore: number
  }
}

const demoUsers: DemoUserRecord[] = [
  {
    id: 'user-001',
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    role: 'Operations Lead',
    team: 'Fulfillment',
    location: 'Austin, TX',
    status: 'online',
    plan: 'Pro',
    initials: 'MP',
    avatarColor: '#0f766e',
    bio: 'Keeps handoff queues moving and tracks delivery blockers across vendor teams.',
    timezone: 'America/Chicago',
    stats: {
      openTasks: 14,
      completedThisWeek: 22,
      focusScore: 88,
    },
    settings: {
      notifications: {
        email: true,
        push: true,
        weeklyDigest: true,
      },
      workspace: {
        startPage: 'Today board',
        showCompletedTasks: true,
        timeFormat: '12h',
      },
      appearance: {
        theme: 'system',
        density: 'comfortable',
      },
    },
  },
  {
    id: 'user-002',
    name: 'Jordan Kim',
    email: 'jordan.kim@example.com',
    role: 'Product Designer',
    team: 'Core UX',
    location: 'Brooklyn, NY',
    status: 'focus',
    plan: 'Starter',
    initials: 'JK',
    avatarColor: '#b45309',
    bio: 'Designs workflow polish, task states, and the settings surface for internal tools.',
    timezone: 'America/New_York',
    stats: {
      openTasks: 7,
      completedThisWeek: 16,
      focusScore: 93,
    },
    settings: {
      notifications: {
        email: true,
        push: false,
        weeklyDigest: true,
      },
      workspace: {
        startPage: 'Inbox',
        showCompletedTasks: false,
        timeFormat: '12h',
      },
      appearance: {
        theme: 'light',
        density: 'compact',
      },
    },
  },
  {
    id: 'user-003',
    name: 'Nora Mensah',
    email: 'nora.mensah@example.com',
    role: 'Customer Success',
    team: 'Accounts',
    location: 'Toronto, CA',
    status: 'offline',
    plan: 'Enterprise',
    initials: 'NM',
    avatarColor: '#7c3aed',
    bio: 'Owns premium customer rollouts and uses the app to monitor onboarding workstreams.',
    timezone: 'America/Toronto',
    stats: {
      openTasks: 19,
      completedThisWeek: 27,
      focusScore: 81,
    },
    settings: {
      notifications: {
        email: true,
        push: true,
        weeklyDigest: false,
      },
      workspace: {
        startPage: 'Customer accounts',
        showCompletedTasks: true,
        timeFormat: '24h',
      },
      appearance: {
        theme: 'dark',
        density: 'comfortable',
      },
    },
  },
]

function toSummary(user: DemoUserRecord): DemoUserSummary {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    team: user.team,
    location: user.location,
    status: user.status,
    plan: user.plan,
    initials: user.initials,
    avatarColor: user.avatarColor,
  }
}

function createToken(userId: string): string {
  return `demo-token-${userId}`
}

function extractUserIdFromToken(token?: string | null): string | undefined {
  if (!token?.startsWith('demo-token-')) {
    return undefined
  }

  return token.replace('demo-token-', '')
}

function setApiHeaders(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Content-Type', 'application/json')
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  setApiHeaders(res)
  res.end(JSON.stringify(payload))
}

async function readJsonBody(req: IncomingMessage): Promise<Record<string, string> | null> {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  if (chunks.length === 0) {
    return {}
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, string>
  } catch {
    return null
  }
}

async function handleDemoApi(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const requestUrl = new URL(req.url ?? '/', 'http://localhost')
  const { pathname } = requestUrl

  if (!pathname.startsWith('/api/demo')) {
    return false
  }

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {})
    return true
  }

  if (req.method === 'GET' && pathname === '/api/demo/users') {
    sendJson(res, 200, { users: demoUsers.map(toSummary) })
    return true
  }

  if (req.method === 'POST' && pathname === '/api/demo/login') {
    const body = await readJsonBody(req)

    if (!body) {
      sendJson(res, 400, { message: 'Invalid JSON payload.' })
      return true
    }

    const user = demoUsers.find(
      (entry) => entry.id === body.userId || entry.email === body.email,
    )

    if (!user) {
      sendJson(res, 404, { message: 'Dummy user not found.' })
      return true
    }

    sendJson(res, 200, {
      token: createToken(user.id),
      user: toSummary(user),
    })
    return true
  }

  if (req.method === 'GET' && pathname === '/api/demo/session') {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length)
      : requestUrl.searchParams.get('token')
    const userId = extractUserIdFromToken(bearerToken)
    const user = demoUsers.find((entry) => entry.id === userId)

    if (!user) {
      sendJson(res, 401, { message: 'Missing or invalid demo token.' })
      return true
    }

    sendJson(res, 200, {
      token: createToken(user.id),
      expiresAt: '2099-12-31T23:59:59.000Z',
      user: toSummary(user),
    })
    return true
  }

  const settingsMatch = pathname.match(/^\/api\/demo\/users\/([^/]+)\/settings$/)
  if (req.method === 'GET' && settingsMatch) {
    const user = demoUsers.find((entry) => entry.id === settingsMatch[1])

    if (!user) {
      sendJson(res, 404, { message: 'Dummy user not found.' })
      return true
    }

    sendJson(res, 200, user.settings)
    return true
  }

  const userMatch = pathname.match(/^\/api\/demo\/users\/([^/]+)$/)
  if (req.method === 'GET' && userMatch) {
    const user = demoUsers.find((entry) => entry.id === userMatch[1])

    if (!user) {
      sendJson(res, 404, { message: 'Dummy user not found.' })
      return true
    }

    sendJson(res, 200, {
      ...toSummary(user),
      bio: user.bio,
      timezone: user.timezone,
      stats: user.stats,
    })
    return true
  }

  sendJson(res, 404, { message: 'Unknown mock API route.' })
  return true
}

function demoApiPlugin() {
  return {
    name: 'demo-api-plugin',
    configureServer(server: {
      middlewares: {
        use: (
          handler: (
            req: IncomingMessage,
            res: ServerResponse,
            next: () => void,
          ) => void,
        ) => void
      }
    }) {
      server.middlewares.use((req, res, next) => {
        void handleDemoApi(req, res).then((handled) => {
          if (!handled) {
            next()
          }
        })
      })
    },
    configurePreviewServer(server: {
      middlewares: {
        use: (
          handler: (
            req: IncomingMessage,
            res: ServerResponse,
            next: () => void,
          ) => void,
        ) => void
      }
    }) {
      server.middlewares.use((req, res, next) => {
        void handleDemoApi(req, res).then((handled) => {
          if (!handled) {
            next()
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), demoApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
