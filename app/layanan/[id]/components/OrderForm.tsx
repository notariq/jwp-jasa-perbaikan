'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

export default function OrderForm({ item }: any) {
  const [jam, setJam] = useState(0);
  const [loading, setLoading] = useState(false);
  const estimasi = jam * item.rate_per_hour;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal mengirim pemesanan');

      const data = await res.json();
      alert('Pemesanan berhasil dibuat');
      form.reset();
      setJam(0);
    } catch (err) {
      alert('Terjadi kesalahan saat memesan');
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='p-6 border border-gray-300 rounded-2xl'>
        <h2 className='text-xl font-semibold mb-4'>Formulir Pemesanan</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

          <Input type='hidden' name='service_id' value={item._id} readOnly />

          <div>
            <Label htmlFor='tanggal'>Tanggal Pemesanan</Label>
            <Input type='date' name='date' required />
          </div>

          <div>
            <Label htmlFor='jumlah-jam'>Jumlah Jam</Label>
            <Input
              type='number'
              name='hours'
              placeholder='Masukkan jumlah jam'
              value={jam}
              onChange={(e) => setJam(Number(e.target.value))}
              required
              min={1}
            />
          </div>

          <div>
            <Label htmlFor='telepon'>Nomor Telepon</Label>
            <Input
              type='tel'
              name='phone'
              placeholder='08xxxxxxxxxx'
              required
              pattern='08[0-9]{8,11}'
            />
          </div>

          <div>
            <Label htmlFor='alamat'>Alamat</Label>
            <Input
              type='text'
              name='address'
              placeholder='Masukkan alamat lengkap'
              required
            />
          </div>

          <div>
            <Label htmlFor='catatan'>Catatan Tambahan</Label>
            <Textarea
              name='note'
              placeholder='Contoh: Harap datang sebelum jam 10 pagi'
            />
          </div>

          <Button type='submit' disabled={loading} className='mt-2'>
            {loading ? 'Memesan...' : 'Pesan Sekarang'}
          </Button>
        </form>
      </div>

      <div className='py-10 border border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2'>
        <p className='font-semibold text-xl'>Estimasi Biaya</p>
        <h1 className='font-bold text-5xl'>Rp {estimasi.toLocaleString('id-ID')}</h1>
      </div>
    </div>
  );
}
