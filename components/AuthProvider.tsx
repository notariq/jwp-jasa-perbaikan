'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: React.ReactNode
  session?: any
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5 * 60} // 5 minutes
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}