"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderCard } from '@/components/orders/OrderCard'; // Assuming you saved the new component in the same folder

// Define the types
interface Order {
  id: string;
  date: string;
  total: number;
  items: number;
  status?: string;
}

interface OrdersProps {
  orders: {
    inProgress: Order[];
    pending: Order[];
    finished: Order[];
  };
}

export function OrdersTabs({ orders }: OrdersProps) {
  return (
    <Tabs defaultValue="in-progress">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="pending">Pending Payment</TabsTrigger>
        <TabsTrigger value="finished">Finished</TabsTrigger>
      </TabsList>

      {/* In Progress Tab */}
      <TabsContent value="in-progress" className="mt-6">
        {orders.inProgress.length > 0 ? (
          orders.inProgress.map(order => (
            <OrderCard key={order.id} order={order} type="in-progress" />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No orders currently in progress.</p>
        )}
      </TabsContent>

      {/* Pending Payment Tab */}
      <TabsContent value="pending" className="mt-6">
        {orders.pending.length > 0 ? (
          orders.pending.map(order => (
            <OrderCard key={order.id} order={order} type="pending" />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No orders are pending payment.</p>
        )}
      </TabsContent>

      {/* Finished Tab */}
      <TabsContent value="finished" className="mt-6">
        {orders.finished.length > 0 ? (
          orders.finished.map(order => (
            <OrderCard key={order.id} order={order} type="finished" />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">You have no past orders.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}