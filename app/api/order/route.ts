import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const ORDER_COLLECTION = process.env.ORDER_COLLECTION as string || 'orders_tb';
const SERVICE_COLLECTION = process.env.SERVICE_COLLECTION as string || 'services_tb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const orders = await db
      .collection(ORDER_COLLECTION)
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders', message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const serviceId = formData.get('service_id') as string;
    const date = formData.get('date') as string;
    const hours = Number(formData.get('hours'));
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const note = (formData.get('note') as string) || '';

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const service = await db.collection(SERVICE_COLLECTION).findOne({ _id: new ObjectId(serviceId) });

    if (!service) {
      return NextResponse.json({ error: 'Service not found',  }, { status: 404 });
    }

    const ratePerHour = service.rate_per_hour;
    const estimation = hours * ratePerHour;
    const serviceName = service.service_name;

    const order = {
      service_id: new ObjectId(serviceId),
      service_name: serviceName,
      date,
      hours,
      phone,
      address,
      note,
      estimation,
      status: 'mengunggu',
      created_at: new Date(),
    };

    const result = await db.collection(ORDER_COLLECTION).insertOne(order);

    return NextResponse.json({ success: true, orderId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
  }
}
