import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const ORDER_COLLECTION = process.env.ORDER_COLLECTION as string || 'orders_tb';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const { status } = await req.json();

        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const result = await db.collection(ORDER_COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order', message: error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const result = await db.collection(ORDER_COLLECTION).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete order', message: error }, { status: 500 });
    }
}