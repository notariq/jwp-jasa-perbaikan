'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Order = {
  _id: string;
  service_id: string;
  service_name: string;
  date: string;
  hours: number;
  phone: string;
  address: string;
  note: string;
  estimation: number;
  status?: string;
};

export default function RecordTab() {
  const [records, setRecords] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/order');
      const data: Order[] = await res.json();

      const selesaiOrders = data.filter((order) => order.status === 'selesai');

      const sum = selesaiOrders.reduce((acc, order) => acc + order.estimation, 0);

      setRecords(selesaiOrders);
      setTotal(sum);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Laporan Pesanan Selesai</h2>
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Layanan</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Jam</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.service_name || order.service_id}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.hours}</TableCell>
                <TableCell>{order.estimation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="text-right">
          <p className="text-lg font-semibold">Total Pendapatan:</p>
          <h2 className="text-2xl font-bold text-green-600">
            Rp {total.toLocaleString('id-ID')}
          </h2>
        </div>
      </div>
    </div>
  );
}
