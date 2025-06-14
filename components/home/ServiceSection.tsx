import React from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'
import clientPromise from '@/lib/mongodb';

export default async function LayananSection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const services = await db.collection(process.env.SERVICE_COLLECTION as string).find({}).limit(3).toArray();

  return (
    <div id='layanan-section' className='h-full flex flex-col gap-6'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-bold text-4xl'>Layanan Kami</h1>
        <Link href={'/layanan'}>
          <Button>
            Lihat Semua
            <ArrowRight className='ml-2' />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
