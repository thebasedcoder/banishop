"use client"
import { useState } from 'react'
import { ShoppingCart, X, Minus, Plus, Trash2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'

export function CartSheet() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Hass Avocados",
      price: 2.99,
      originalPrice: 3.99,
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
      quantity: 2
    },
    {
      id: 2,
      name: "Organic Bananas",
      price: 0.69,
      originalPrice: 0.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      quantity: 5
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = 5.99
  const total = subtotal + shipping

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-gray-100"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-5 w-5 text-gray-700 transition-colors hover:text-[#E11D48]" />
          {cartItems.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E11D48] text-xs font-medium text-white">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Your Cart ({cartItems.length})</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
              <ShoppingCart className="h-12 w-12 mb-4 text-gray-300" />
              <p className="mb-2 text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-center text-gray-400">
                Browse our products and add items to get started
              </p>
              <Button asChild variant="outline" className="mt-4 border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48]/10">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {cartItems.map(item => (
                <div key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 text-gray-500 hover:text-red-500 ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-bold text-[#E11D48]">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="flex items-center border rounded-lg border-[#E11D48]/30 bg-[#E11D48]/5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-[#E11D48] hover:bg-[#E11D48]/10 h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="w-12 text-center border-0 shadow-none text-sm font-medium bg-transparent"
                            min={1}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[#E11D48] hover:bg-[#E11D48]/10 h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-[#E11D48]">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button asChild className="w-full mt-6 bg-[#E11D48] hover:bg-[#E11D48]/90 h-12">
              <Link href="/checkout" className="flex items-center justify-center">
                Proceed to Checkout <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <div className="mt-4 text-center text-sm text-gray-500">
              or{' '}
              <Link href="/products" className="font-medium text-[#E11D48] hover:text-[#E11D48]/80">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}