'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default function TopBar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ 
      callbackUrl: '/'
    })
  }

  return (
    <div className='flex items-center justify-between'>
        <Link href="/">
            <ArrowLeft />
        </Link>

        <h1 className='font-bold text-2xl'>Hello, {session?.user?.name}</h1>

        <Button onClick={handleLogout}>
          Logout
        </Button>
    </div>
  )
}