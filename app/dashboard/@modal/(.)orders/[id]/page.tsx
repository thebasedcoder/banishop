"use client";

import { useRouter, useParams } from 'next/navigation';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OrderDetailView from '@/components/orders/order-detail-view';

export default function OrderModal() {
  const router = useRouter();
  const params = useParams(); // Gets params like { id: 'ORD-2025-003' }

  // Create simple, static dummy data right here.
  const mockOrder = {
    id: params.id as string, // Use the ID from the URL
    date: 'August 05, 2025',
    status: 'Delivered',
    statusDate: 'August 10, 2025',
    items: [
      { id: 1, name: 'Dummy Product 1', price: 10.99, quantity: 2, image: '/meat.jpg' },
      { id: 2, name: 'Dummy Product 2', price: 5.49, quantity: 1, image: '/meat.jpg' },
    ],
    summary: { subtotal: 27.47, shipping: 5.99, taxes: 2.50, total: 35.96 },
    shippingAddress: { name: 'Test User', street: '123 Test St', city: 'Berlin', zip: '10115' },
    payment: { method: 'Visa', last4: '1234' },
    history: [
      { status: 'Delivered', date: '2025-08-10' },
      { status: 'Shipped', date: '2025-08-07' },
    ]
  };

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 max-h-[90vh] overflow-y-auto w-[calc(100%-1.5rem)] sm:max-w-4xl">
        {/* Pass the static mock data directly to the view */}
        <OrderDetailView />
      </DialogContent>
    </Dialog>
  );
}
{/* {order ? (
  <OrderDetailView order={order} />
) : (
  <div className="p-8 text-center">Loading...</div>
  
  )} */}