'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import OrderForm from './OrderForm'

type Props = {
  item: {
    _id: string
    service_name: string
    rate_per_hour: number
    description: string
    image_src?: string
  }
}

export default function LayananDetail({ item }: any) {
  return (
    <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 px-4 gap-4 mt-6'>

      <div className='p-6 border border-gray-300 rounded-2xl flex flex-col gap-4'>
        <p><span className='font-semibold'>ID Layanan:</span> {item._id}</p>
        {item.image_src ? (
          <img src={item.image_src} alt={item.name} className='w-full object-cover rounded' />
        ) : (
          <div className="bg-gray-200 w-full h-64 rounded" />
        )}
        <div className='flex flex-row items-center justify-between'>
          <h1 className='font-bold text-2xl'>{item.service_name}</h1>
          <p className='p-2 bg-gray-200 rounded-2xl'>
            <span className='font-semibold'>Biaya per Jam:</span> Rp{item.rate_per_hour.toLocaleString('id-ID')}
          </p>
        </div>
        <p className='text-gray-600'>{item.description}</p>
      </div>

      <OrderForm item={item} />
    </div>
  )
}
