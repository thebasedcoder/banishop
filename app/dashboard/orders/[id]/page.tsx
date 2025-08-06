import OrderDetailView from '@/components/orders/order-detail-view';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// This is now a Server Component.
// In a real app, you would fetch data from your API here.
async function getOrderById(id: string) {
  console.log(`Fetching data for order: ${id}`);
  // Returning mock data for demonstration
  return {
    id: id,
    date: 'July 28, 2025',
    status: 'Delivered',
    statusDate: 'August 1, 2025',
    items: [
      { id: 1, name: 'Artisan Sourdough Bread', price: 4.49, quantity: 2, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
    ],
    summary: { subtotal: 8.98, shipping: 5.99, taxes: 1.99, total: 16.96 },
    shippingAddress: { name: 'Reza', street: 'Musterstraße 123', city: 'Berlin', zip: '10115' },
    payment: { method: 'Visa', last4: '4242' },
    history: [{ status: 'Delivered', date: '2025-08-01' }, { status: 'Shipped', date: '2025-07-29' }],
  };
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container flex-1 my-8 md:my-12 px-4">
        <Link href="/dashboard/orders" className="flex items-center text-sm text-gray-600 hover:text-[#E11D48] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Orders
        </Link>
        <OrderDetailView />
      </main>
    </div>
  );
}