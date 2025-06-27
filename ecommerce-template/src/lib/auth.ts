import { supabase } from './database'
import type { User, Session } from '@supabase/supabase-js'

export type AuthUser = User
export type AuthSession = Session

export const auth = {
  // Sign up with email and password
  signUp: async (
    email: string,
    password: string,
    metadata?: Record<string, unknown>
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()
    return { data, error }
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  },

  // Update password
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { data, error }
  },

  // Listen to auth state changes
  onAuthStateChange: (
    callback: (event: string, session: Session | null) => void
  ) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// User roles and permissions
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  SELLER = 'seller',
}

export const checkUserRole = (
  user: AuthUser | null,
  requiredRole: UserRole
): boolean => {
  if (!user) return false
  const userRole = user.user_metadata?.role as UserRole
  return userRole === requiredRole
}

export const isAdmin = (user: AuthUser | null): boolean => {
  return checkUserRole(user, UserRole.ADMIN)
}

export const isSeller = (user: AuthUser | null): boolean => {
  return checkUserRole(user, UserRole.SELLER) || isAdmin(user)
}
