"use client"
import {
  ChevronLeft, FileText, Repeat, HelpCircle, MapPin, CreditCard, PackageCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
// Mock Data for a single order
const order = {
  id: 'ORD-2025-003',
  date: 'July 28, 2025',
  status: 'Delivered', // Can be 'Processing', 'Shipped', 'Delivered'
  statusDate: 'August 1, 2025',
  shippingAddress: {
    name: 'Reza',
    street: 'Musterstraße 123',
    city: 'Berlin',
    zip: '10115',
  },
  payment: {
    method: 'Visa',
    last4: '4242',
    billingAddress: 'Same as shipping',
  },
  items: [
    { id: 1, name: 'Artisan Sourdough Bread', price: 4.49, quantity: 2, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
    { id: 2, name: 'Free-Range Eggs (12-pack)', price: 3.99, quantity: 1, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980dfa' },
    { id: 3, name: 'Organic Blueberries', price: 5.99, quantity: 1, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e' },
  ],
  summary: {
    subtotal: 18.96,
    shipping: 5.99,
    taxes: 1.99,
    total: 26.94,
  },
  history: [
    { status: 'Delivered', date: '2025-08-01' },
    { status: 'Shipped', date: '2025-07-29' },
    { status: 'Processing', date: '2025-07-28' },
    { status: 'Order Placed', date: '2025-07-28' },
  ]
};
// Main Order Detail Page Component
export default function OrderDetailView() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container flex-1 my-8 md:my-12 px-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Link href="/dashboard?tab=orders" className="flex items-center text-sm text-gray-600 hover:text-[#E11D48] transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-2">
              Order {order.id}
            </h1>
            <p className="text-gray-500">
              Placed on {order.date} • <span className="text-green-600 font-medium">{order.status} on {order.statusDate}</span>
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline"><FileText className="h-4 w-4 mr-2" /> Invoice</Button>
            <Button className="bg-[#E11D48] hover:bg-[#E11D48]/90"><Repeat className="h-4 w-4 mr-2" /> Re-order</Button>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Items and Tracking */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-200">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center py-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Tracking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200" />
                  {order.history.map((event, index) => (
                    <div key={index} className="flex items-start mb-6 last:mb-0">
                      <div className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full mt-1 ${index === 0 ? 'bg-[#E11D48]' : 'bg-gray-300'}`}>
                        {index === 0 && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                      <div className="ml-6">
                        <p className={`font-semibold ${index === 0 ? 'text-gray-900' : 'text-gray-500'}`}>{event.status}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${order.summary.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>${order.summary.shipping.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Taxes</span><span>${order.summary.taxes.toFixed(2)}</span></div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${order.summary.total.toFixed(2)}</span></div>
                <Separator />
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="font-semibold flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-500" />Shipping Address</h4>
                    <address className="not-italic text-sm text-gray-600 pl-6">
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.zip}
                    </address>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center"><CreditCard className="h-4 w-4 mr-2 text-gray-500" />Payment Method</h4>
                    <p className="text-sm text-gray-600 pl-6">Ending in {order.payment.last4} ({order.payment.method})</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full"><HelpCircle className="h-4 w-4 mr-2" /> Get Help</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 