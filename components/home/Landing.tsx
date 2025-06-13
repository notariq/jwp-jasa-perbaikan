import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div 
      className="h-screen px-12 w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl"
      style={{ backgroundImage: "url('/bg-landing.jpg')" }}
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-4">Lorem ipsum dolor sit.</h1>
        <p className="text-2xl text-gray-700 mt-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dignissimos ratione magnam numquam
          necessitatibus, minima asperiores quod nam exercitationem quae?
        </p>
      </div>

      <div className="flex-col items-center justify-center gap-4 hidden md:flex">
        <Button asChild className="text-lg px-12 py-8">
          <Link href="/layanan">Lihat Layanan</Link>
        </Button>
      </div>
    </div>
  );
}
