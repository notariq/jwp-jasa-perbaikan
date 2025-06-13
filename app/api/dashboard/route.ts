import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const servicesCount = await db.collection('services_tb').countDocuments();
  const totalOrders = await db.collection('orders_tb').countDocuments();
  const ongoingOrders = await db.collection('orders_tb').countDocuments({
    status: { $in: ['menunggu', 'diproses'] },
  });
  const finishedOrders = await db.collection('orders_tb').countDocuments({ status: 'selesai' });

  return NextResponse.json({
    servicesCount,
    totalOrders,
    ongoingOrders,
    finishedOrders,
  });
}
