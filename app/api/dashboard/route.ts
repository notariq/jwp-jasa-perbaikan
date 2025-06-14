import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const ORDER_COLLECTION = process.env.ORDER_COLLECTION as string || 'orders_tb';
  const SERVICE_COLLECTION = process.env.SERVICE_COLLECTION as string || 'services_tb';

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const servicesCount = await db.collection(SERVICE_COLLECTION).countDocuments();
  const totalOrders = await db.collection(ORDER_COLLECTION).countDocuments();
  const ongoingOrders = await db.collection(ORDER_COLLECTION).countDocuments({
    status: { $in: ['menunggu', 'diproses'] },
  });
  const finishedOrders = await db.collection(ORDER_COLLECTION).countDocuments({ status: 'selesai' });

  return NextResponse.json({
    servicesCount,
    totalOrders,
    ongoingOrders,
    finishedOrders,
  });
}
