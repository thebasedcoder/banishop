"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Repeat, Trash2, XCircle } from 'lucide-react';
import Link from 'next/link';

// Define the Order type
interface Order {
  id: string;
  date: string;
  total: number;
  items: number;
  status?: string;
}

// Define the props for our new component
interface OrderCardProps {
  order: Order;
  type: 'in-progress' | 'pending' | 'finished';
}

// Helper component to render the correct actions based on order type
const OrderActions = ({ type }: { type: OrderCardProps['type'] }) => {
  if (type === 'in-progress') {
    return (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
        <Button size="sm" variant="outline">Edit</Button>
      </div>
    );
  }
  if (type === 'pending') {
    return (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        <Button size="sm" className="bg-[#E11D48] hover:bg-[#E11D48]/90"><CreditCard className="mr-2 h-4 w-4" /> Checkout</Button>
      </div>
    );
  }
  if (type === 'finished') {
    return (
      <Button size="sm" variant="outline"><Repeat className="mr-2 h-4 w-4" /> Re-order</Button>
    );
  }
  return null;
};

// Main OrderCard component
export function OrderCard({ order, type }: OrderCardProps) {
  const statusInfo = {
    'in-progress': { text: order.status, className: 'text-blue-600 bg-blue-100' },
    'pending': { text: 'Awaiting Payment', className: 'text-orange-600 bg-orange-100' },
    'finished': { text: 'Completed', className: 'text-green-600 bg-green-100' },
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="hover:text-[#E11D48] text-lg">
              <Link href={`/dashboard/orders/${order.id}`}>{order.id}</Link>
            </CardTitle>
            <CardDescription>Date: {order.date} • {order.items} items</CardDescription>
          </div>
          <div className="font-bold text-lg text-left sm:text-right">${order.total.toFixed(2)}</div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className={`text-sm font-medium px-2 py-1 rounded-md ${statusInfo[type].className}`}>
          {statusInfo[type].text}
        </span>
        <OrderActions type={type} />
      </CardFooter>
    </Card>
  );
}