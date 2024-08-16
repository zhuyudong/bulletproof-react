import type { ReactNode } from 'react'
import { configureAuth } from 'react-query-auth'
import { Navigate, useLocation } from 'react-router-dom'
import { z } from 'zod'

import type { AuthResponse, User } from '@/types/api'

import { api } from './api-client'

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me')

  return response.data
}

const logout = (): Promise<void> => {
  return api.post('/auth/logout')
}

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required')
})

export type LoginInput = z.infer<typeof loginInputSchema>
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data)
}

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    first_name: z.string().min(1, 'Required'),
    last_name: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
  })
  .and(
    z
      .object({
        team_id: z.string().min(1, 'Required'),
        team_name: z.null().default(null)
      })
      .or(
        z.object({
          team_name: z.string().min(1, 'Required'),
          team_id: z.null().default(null)
        })
      )
  )

export type RegisterInput = z.infer<typeof registerInputSchema>

const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return api.post('/auth/register', data)
}

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    return response.user
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data)
    return response.user
  },
  logoutFn: logout
}

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig)

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUser()
  const location = useLocation()

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }

  return children
}
