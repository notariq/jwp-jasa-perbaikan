'use client'

import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  onUpdate ?: () => void;
};

export default function AddServiceForm({ onUpdate }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        service_name: '',
        description: '',
        rate_per_hour: '',
        image_src: null as File | null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('service_name', form.service_name);
        fd.append('description', form.description);
        fd.append('rate_per_hour', form.rate_per_hour);
        if (form.image_src) fd.append('image', form.image_src);

        const res = await fetch('/api/service', {
            method: 'POST',
            body: fd,
        });

        if (res.ok) {
            setForm({ service_name: '', description: '', rate_per_hour: '', image_src: null });
            onUpdate?.();
            setOpen(false);
            setLoading(false);
        } else {
            alert('Failed to update service');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-600">Tambah Layanan Baru</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                <DialogTitle>Tambah Layanan Baru</DialogTitle>
                </DialogHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <Input
                        type="file"
                        onChange={(e) => setForm({ ...form, image_src: e.target.files?.[0] ?? null })}
                        required
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
    )
}
