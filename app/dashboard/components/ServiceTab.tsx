'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import UpdateServiceForm from './dialog/UpdateServiceForm';
import AddServiceForm from './dialog/AddServiceForm';
import { Trash2 } from 'lucide-react';

type Service = {
  id: string;
  service_name: string;
  description: string;
  rate_per_hour: number;
};

export default function ServiceTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;
    await fetch(`/api/service/${id}`, {
      method: 'DELETE',
    });
    fetchServices();
  }

  const fetchServices = async () => {
    const res = await fetch('/api/service');
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className='mb-4'>
        <AddServiceForm onUpdate={fetchServices} />
      </div>
      <div className="overflow-x-auto border rounded-xl bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Layanan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="text-right">Tarif per Jam</TableHead>
              <TableHead className='text-center'>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={service.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.service_name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell className="text-right">
                  Rp {service.rate_per_hour.toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                  <div className='flex justify-center gap-2'>
                    <UpdateServiceForm 
                      serviceId={service.id}
                      onUpdate={fetchServices}
                    />
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
