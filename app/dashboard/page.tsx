'use client'

import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Wrench, ClipboardList, FileText } from 'lucide-react';

// Lazy-loaded components
const DashboardTab = dynamic(() => import('./components/DashboardTab'));
const ServiceTab = dynamic(() => import('./components/ServiceTab'));
const OrderTab = dynamic(() => import('./components/OrderTab'));
const RecordTab = dynamic(() => import('./components/RecordTab'));

export default function HomePage() {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-full w-full p-2">
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="mr-2 w-4 h-4" />
            <span className='hidden md:block'>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="layanan">
            <Wrench className="mr-2 w-4 h-4" />
            <span className='hidden md:block'>Manajemen Layanan</span>
          </TabsTrigger>
          <TabsTrigger value="pesanan">
            <ClipboardList className="mr-2 w-4 h-4" />
            <span className='hidden md:block'>Manajemen Pesanan</span>
          </TabsTrigger>
          <TabsTrigger value="laporan">
            <FileText className="mr-2 w-4 h-4" />
            <span className='hidden md:block'>Laporan</span>
          </TabsTrigger>
        </TabsList>

        <div className="bg-gray-100 p-4 rounded-lg mt-2">
          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>
          <TabsContent value="layanan">
            <ServiceTab />
          </TabsContent>
          <TabsContent value="pesanan">
            <OrderTab />
          </TabsContent>
          <TabsContent value="laporan">
            <RecordTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
