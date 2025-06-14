'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { OrderType } from '@/types/d';

export default function OrderTab() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/order');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    const confirm = window.confirm('Yakin ingin menghapus pesanan ini?');
    if (!confirm) return;

    await fetch(`/api/order/${id}`, { method: 'DELETE' });
    fetchOrders();
  };

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Jam</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.service_name || order.service_id}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.note}</TableCell>
                  <TableCell>{order.hours}</TableCell>
                  <TableCell>{order.estimation}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status || 'menunggu'}
                      onValueChange={(value) => updateStatus(order._id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menunggu">Menunggu</SelectItem>
                        <SelectItem value="diproses">Diproses</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteOrder(order._id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
  );
}
