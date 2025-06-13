import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const services = await db.collection('services_tb').find({}).toArray();

  const formatted = services.map(({ _id, service_name, description, rate_per_hour, image_src }) => ({
    id: _id.toString(),
    service_name,
    description,
    rate_per_hour,
    image_src,
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const service_name = formData.get('service_name') as string;
  const description = formData.get('description') as string;
  const rate_per_hour = Number(formData.get('rate_per_hour'));
  const file = formData.get('image') as File;

  let imagePath = null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${file.name}`;
    const dir = path.join(process.cwd(), 'public', 'uploads');

    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);

    imagePath = `/uploads/${filename}`;
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const result = await db.collection('services_tb').insertOne({
    service_name,
    description,
    rate_per_hour,
    image_src: imagePath,
  });

  return NextResponse.json({ success: true, insertedId: result.insertedId });
}
