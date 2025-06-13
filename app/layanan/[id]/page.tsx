'use server'

import LayananDetail from './components/ServiceDetail'
import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function getServiceById(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('jasa_perbaikan_db');
        const service = await db.collection('services_tb').findOne({ _id: new ObjectId(id) });
        return service
    } catch (error) {
        return null
    }
}

export default async function LayananPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const service = await getServiceById(id);
  
  if (!service) {
    notFound()
  }

  const serializedService = JSON.parse(JSON.stringify(service))

  return <LayananDetail item={serializedService} />
}
