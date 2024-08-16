import { env } from '@/config/env'

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser')
    const { initializeDb } = await import('./db')
    await initializeDb()
    // return worker.start()
    return worker.start({
      serviceWorker: { url: '/mockServiceWorker.js' },
      // eslint-disable-next-line unused-imports/no-unused-vars
      onUnhandledRequest: ({ headers, method, url }) => {
        // NOTE: ignore non api requests
        if (!url.startsWith(env.API_URL)) {
          return
        }
      }
    })
  }
}
