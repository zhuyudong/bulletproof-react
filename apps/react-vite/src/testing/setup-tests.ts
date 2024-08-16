import '@testing-library/jest-dom/vitest'

// import { env } from '@/config/env'
import { initializeDb, resetDb } from '@/testing/mocks/db'
import { server } from '@/testing/mocks/server'
vi.mock('zustand')

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error'
    // onUnhandledRequest: 'bypass' // 'error'
    // eslint-disable-next-line unused-imports/no-unused-vars
    // onUnhandledRequest: ({ headers, method, url }) => {
    //   // NOTE: ignore non api requests
    //   if (!url.startsWith(env.API_URL)) {
    //     return
    //   }
    // }
  })
)
afterAll(() => server.close())
beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))

  vi.stubGlobal('ResizeObserver', ResizeObserverMock)

  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64')
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary')

  initializeDb()
})
afterEach(() => {
  server.resetHandlers()
  resetDb()
})
