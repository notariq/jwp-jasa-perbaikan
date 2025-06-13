'use client'

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

type Props = {
  serviceId: string;
  onUpdate?: () => void;
};

export default function UpdateServiceForm({ serviceId, onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    service_name: '',
    description: '',
    rate_per_hour: '',
    image_src: null as File | null,
  });

  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetch(`/api/service/${serviceId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            service_name: data.service_name || '',
            description: data.description || '',
            rate_per_hour: data.rate_per_hour?.toString() || '',
            image_src: null,
          });
          setExistingImage(data.image_src || null);
        });
    }
  }, [open, serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('service_name', form.service_name);
    formData.append('description', form.description);
    formData.append('rate_per_hour', form.rate_per_hour);

    if (form.image_src) {
      formData.append('image', form.image_src);
    }

    const res = await fetch(`/api/service/${serviceId}`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setOpen(false);
      onUpdate?.();
    } else {
      alert('Gagal memperbarui layanan');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500">Ubah</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ubah Layanan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {existingImage && (
            <img
              src={existingImage}
              alt="Current"
              className="w-full h-auto rounded-md border"
            />
          )}

          <Input
            type="file"
            onChange={(e) => setForm({ ...form, image_src: e.target.files?.[0] ?? null })}
            accept="image/*"
          />

          <Input
            placeholder="Nama Layanan"
            value={form.service_name}
            onChange={(e) => setForm({ ...form, service_name: e.target.value })}
            required
          />
          <Textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Tarif per jam"
            value={form.rate_per_hour}
            onChange={(e) => setForm({ ...form, rate_per_hour: e.target.value })}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
