import React from 'react';
import { Card } from '../ui/card';

export default function About() {
  return (
    <section className="min-h-screen px-6 md:px-12 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Tentang Kami
      </h1>

      <div
        id="about"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left side: text content */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 shadow-md hover:shadow-lg transition duration-300 bg-white">
            <p className="text-gray-700 leading-relaxed text-justify">
              Kami adalah tim profesional yang berdedikasi dalam memberikan layanan
              terbaik untuk kebutuhan rumah tangga Anda. Dengan pengalaman bertahun-tahun
              dan tenaga kerja terlatih, kami memastikan bahwa setiap layanan dilakukan
              dengan teliti, tepat waktu, dan memuaskan.
            </p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque vitae magnam eius quidem. Consequatur voluptatum deserunt, temporibus aut nostrum at. Voluptas porro mollitia corporis placeat quibusdam accusamus quisquam modi, perspiciatis, rerum est odit. Perferendis debitis ut vero est sunt sequi necessitatibus neque, error tenetur reiciendis corrupti laudantium asperiores, consequuntur excepturi!
            </p>
          </Card>

          <Card className="p-6 shadow-md flex items-center justify-between bg-white">
            <div className="text-center">
              <p className="text-sm text-gray-500">Jumlah Layanan Terselesaikan</p>
              <h2 className="text-4xl font-bold text-green-600">NUM</h2>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Tingkat Kepuasan</p>
              <h2 className="text-4xl font-bold text-blue-600">NUM</h2>
            </div>
          </Card>
          
           <Card className="p-6 shadow-md bg-white text-center">
              <p className="text-sm text-gray-500">Hubungi Kami</p>
              <h1 className="font-bold text-3xl">+62 812-1313-2</h1>
            </Card>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/construction-worker-concept-illustration_114360-9066.jpg"
            alt="Construction Worker Illustration"
            className="w-full md:w-3/4"
          />
        </div>
      </div>
    </section>
  );
}
