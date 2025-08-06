"use client"
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComp } from '@/components/ui/calendar'
import { format } from 'date-fns'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function CheckoutPage() {
  // Checkout steps
  const [step, setStep] = useState<'cart' | 'address' | 'delivery'>('cart')

  // Mock cart data
  const [cart, setCart] = useState([
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

  // Address data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      isDefault: true
    },
    {
      id: 2,
      name: "Work",
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      isDefault: false
    }
  ])
  const [selectedAddress, setSelectedAddress] = useState(1)

  // Delivery date
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const total = subtotal + 5.99 // Add shipping

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const addNewAddress = () => {
    // In a real app, this would open a form modal
    const newAddress = {
      id: addresses.length + 1,
      name: "New Address",
      street: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    }
    setAddresses([...addresses, newAddress])
    setSelectedAddress(newAddress.id)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Progress indicator */}
        <div className="container py-6 px-4 sm:px-6 ">
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step !== 'cart' ? 'text-primary' : 'text-gray-900'}`}>
              <div className={`flex items-center justify-center md:w-8 md:h-8 w-7 h-7 rounded-full ${step === 'cart' ? 'bg-primary text-white' : 'bg-primary/10'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Cart</span>
            </div>

            <div className={`flex items-center mx-4 ${step === 'delivery' ? 'text-primary' : step === 'address' ? 'text-gray-900' : 'text-gray-400'}`}>
              <div className={`w-6 md:w-16 h-px ${step !== 'cart' ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center md:w-8 md:h-8 w-7 h-7 rounded-full ml-4 ${step === 'address' ? 'bg-primary text-white' : step === 'delivery' ? 'bg-primary/10' : 'bg-gray-100'}`}>
                2
              </div>
              <span className={`ml-2 font-medium ${step === 'address' || step === 'delivery' ? 'text-gray-900' : 'text-gray-400'}`}>Address</span>
            </div>

            <div className={`flex items-center ${step === 'delivery' ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-6 md:w-16 h-px ${step === 'delivery' ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center md:w-8 md:h-8 w-7 h-7 rounded-full ml-4 ${step === 'delivery' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Delivery</span>
            </div>
          </div>
        </div>

        {step === 'cart' && (
          <section className="container py-6 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart ({cart.length})</h2>

                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                      <div className="relative aspect-square w-full sm:w-32 overflow-hidden rounded-lg bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                            )}
                          </div>

                          <div className="flex items-center border rounded-lg p-1 border-primary/30 bg-primary/5">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-primary hover:bg-primary/10 h-8 w-8"
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
                              className="text-primary hover:bg-primary/10 h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="border rounded-lg p-6 h-fit sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-primary">-${discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$5.99</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-gray-900 font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setStep('address')}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 h-12 text-lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </section>
        )}

        {step === 'address' && (
          <section className="container py-6 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Delivery Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAddress === address.id ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-start">
                      <div className={`flex items-center justify-center h-5 w-5 rounded-full border mr-3 mt-0.5 ${selectedAddress === address.id ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                        {selectedAddress === address.id && (
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{address.name} {address.isDefault && <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Default</span>}</h3>
                        <p className="text-gray-600 mt-1">{address.street}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  onClick={addNewAddress}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center"
                >
                  <div className="text-center">
                    <MapPin className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <span className="text-primary font-medium">Add New Address</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep('cart')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back to Cart
                </Button>
                <Button
                  onClick={() => setStep('delivery')}
                  className="bg-primary hover:bg-primary/90 "
                >
                  Continue to Delivery
                </Button>
              </div>
            </div>
          </section>
        )}

        {step === 'delivery' && (
          <section className="container py-6 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Delivery Date</h2>

              <div className="bg-white border rounded-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Estimated Delivery Date</h3>
                    <p className="text-gray-600 mt-1">Select when you'd like to receive your order</p>
                  </div>

                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full sm:w-auto justify-start text-left font-normal ${!date ? 'text-gray-500' : 'text-gray-900'}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComp
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date()
                          const nextWeek = new Date()
                          nextWeek.setDate(today.getDate() + 7)
                          return date < today || date > nextWeek
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep('address')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back to Address
                </Button>
                <Button
                  onClick={() => alert('Order placed successfully!')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}