'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

type DashboardStats = {
  servicesCount: number
  totalOrders: number
  ongoingOrders: number
  finishedOrders: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
      <Card>
        <CardTitle className='text-center'>Total Layanan</CardTitle>
        <CardContent className='text-center text-2xl font-bold'>
          {stats?.servicesCount}
        </CardContent>
      </Card>
      <Card>
        <CardTitle className='text-center'>Total Pesanan</CardTitle>
        <CardContent className='text-center text-2xl font-bold'>
          {stats?.totalOrders}
        </CardContent>
      </Card>
      <Card>
        <CardTitle className='text-center'>Pesanan Berjalan</CardTitle>
        <CardContent className='text-center text-2xl font-bold'>
          {stats?.ongoingOrders}
        </CardContent>
      </Card>
      <Card>
        <CardTitle className='text-center'>Pesanan Selesai</CardTitle>
        <CardContent className='text-center text-2xl font-bold'>
          {stats?.finishedOrders}
        </CardContent>
      </Card>
    </div>
  )
}
