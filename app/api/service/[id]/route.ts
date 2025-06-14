import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

const IMAGE_DIR = path.join(process.cwd(), 'public', 'uploads');
const SERVICE_COLLECTION = process.env.SERVICE_COLLECTION as string || 'services_tb';

async function deleteImage(filename: string) {
  const filePath = path.join(IMAGE_DIR, filename);
  try {
    await unlink(filePath);
    console.log(`Deleted: ${filePath}`);
  } catch (err) {
    console.warn(`Failed to delete image: ${filePath}`);
    console.error(err);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection(SERVICE_COLLECTION);

  const formData = await req.formData();

  const service_name = formData.get('service_name') as string;
  const description = formData.get('description') as string;
  const rate_per_hour = Number(formData.get('rate_per_hour'));
  const image = formData.get('image') as File | null;

  const existing = await collection.findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  let newImagePath = existing.image_src;

  if (image && typeof image.name === 'string') {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!existsSync(IMAGE_DIR)) mkdirSync(IMAGE_DIR, { recursive: true });

    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(IMAGE_DIR, filename);
    await writeFile(filepath, buffer);

    newImagePath = `/uploads/${filename}`;

    if (existing.image_src && existing.image_src.startsWith('/uploads/')) {
      const oldFilename = existing.image_src.replace('/uploads/', '');
      await deleteImage(oldFilename);
    }
  }

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        service_name,
        description,
        rate_per_hour,
        image_src: newImagePath,
      },
    }
  );

  return NextResponse.json({ success: true });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const service = await db.collection(SERVICE_COLLECTION).findOne({ _id: new ObjectId(id) });

    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const formatted = {
        id: service._id.toString(),
        service_name: service.service_name,
        description: service.description,
        rate_per_hour: service.rate_per_hour,
        image_src: service.image_src || null,
    };

    return NextResponse.json(formatted);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const service = await db.collection(SERVICE_COLLECTION).findOne({ _id: new ObjectId(id) });

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  if (service.image_src && service.image_src.startsWith('/uploads/')) {
    const filename = service.image_src.replace('/uploads/', '');
    await deleteImage(filename);
  }

  await db.collection(SERVICE_COLLECTION).deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}