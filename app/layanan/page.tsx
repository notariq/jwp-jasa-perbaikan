'use server'

import React from 'react'
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import clientPromise from '@/lib/mongodb';

export default async function LayananList() {
  const client = await clientPromise;
  const db = client.db("jasa_perbaikan_db");
  const services = await db.collection("services_tb").find({}).toArray();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 m-4 border border-gray-300 rounded-2xl">
        {services.map((item, index) => (
          <Link key={index} href={`/layanan/${item._id}`}>
              <Card className='h-full'>
                <CardHeader>
                  <div className="bg-gray-200 w-full rounded mb-4 overflow-clip flex items-center justify-center">
                    <img src={item.image_src} alt="" className='h-70'/>
                  </div>
                  <CardTitle>{item.service_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            </Link>
        ))}
      </div>
    </>
  )
}
