/* eslint-disable vitest/expect-expect */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  act,
  render,
  renderHook,
  screen,
  waitFor
} from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'

import { configureAuth } from '../src'

const renderApp = (children: React.ReactNode) => {
  const client = new QueryClient()
  return render(
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

const renderAppHook = <Result,>(hook: () => Result) => {
  const client = new QueryClient()
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
  })
}

beforeEach(() => {
  jest.resetAllMocks()
})

const user = {
  id: '1',
  name: 'Test User',
  email: 'user@mail.com'
}

const config = {
  userFn: jest.fn(),
  loginFn: jest.fn(),
  logoutFn: jest.fn(),
  registerFn: jest.fn()
}

const { AuthLoader, useUser, useLogin, useRegister, useLogout } =
  configureAuth(config)

describe('useUser', () => {
  it('returns the authenticated user', async () => {
    config.userFn.mockResolvedValue(user)

    const { result } = renderAppHook(() => useUser())

    await waitFor(() => expect(result.current.data).toEqual(user))

    expect(config.userFn).toHaveBeenCalled()
  })
})

describe('useRegister', () => {
  it('calls the register function and sets the authenticated user on success', async () => {
    config.registerFn.mockResolvedValue(user)

    const registerCredentials = {
      name: 'Test User 2',
      email: 'user2@mail.com',
      password: 'password'
    }

    const { result } = renderAppHook(() => useRegister())

    act(() => {
      result.current.mutate(registerCredentials)
    })

    await waitFor(() =>
      expect(config.registerFn).toHaveBeenCalledWith(registerCredentials)
    )
    expect(result.current.data).toEqual(user)
  })
})

describe('useLogin', () => {
  it('calls the login function and sets the authenticated user on success', async () => {
    config.loginFn.mockResolvedValue(user)

    const loginCredentials = {
      email: 'user@mail.com',
      password: 'password'
    }

    const { result } = renderAppHook(() => useLogin())

    act(() => {
      result.current.mutate(loginCredentials)
    })

    await waitFor(() =>
      expect(config.loginFn).toHaveBeenCalledWith(loginCredentials)
    )
    expect(result.current.data).toEqual(user)
  })
})

describe('useLogout', () => {
  it('calls the logout function and removes the authenticated user on success', async () => {
    config.logoutFn.mockResolvedValue(true)

    const { result } = renderAppHook(() => useLogout())

    act(() => {
      result.current.mutate({})
    })

    await waitFor(() => expect(config.logoutFn).toHaveBeenCalled())
    expect(result.current.data).toEqual(true)
  })
})

describe('AuthLoader', () => {
  it('renders loading component when not yet fetched', () => {
    config.userFn.mockResolvedValue(null)
    renderApp(
      <AuthLoader
        renderLoading={() => <div>Loading...</div>}
        renderUnauthenticated={() => <div>Unauthenticated</div>}
      >
        Hello {user.name}!
      </AuthLoader>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders unauthenticated component when authenticated user is null', async () => {
    config.userFn.mockResolvedValue(null)
    renderApp(
      <AuthLoader
        renderLoading={() => <div>Loading...</div>}
        renderUnauthenticated={() => <div>Unauthenticated</div>}
      >
        Hello {user.name}!
      </AuthLoader>
    )

    await screen.findByText('Unauthenticated')
  })

  it('renders children when authenticated user is not null', async () => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const TestChild = () => <div>Test</div>

    config.userFn.mockResolvedValue(user)

    renderApp(
      <AuthLoader renderLoading={() => <div>Loading...</div>}>
        Hello {user.name}!
      </AuthLoader>
    )

    await screen.findByText(`Hello ${user.name}!`)
  })
})
