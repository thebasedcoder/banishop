"use client"
import Image from 'next/image'
import SignForm from '@/components/SignForm'

export default function Page({ isSignUp = false }) {
  return (
    <div className="relative min-h-screen flex">
      {/* Background Image - Visible on mobile */}
      <div className="fixed inset-0 md:hidden -z-10">
        <Image
          src="/bakery.jpg"
          alt="Fresh groceries"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Left Side - Image (Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-primary/20 relative overflow-hidden">
        <Image
          src="/bakery.jpg"
          alt="Fresh groceries"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to FreshMart</h2>
            <p className="text-xl">
              {isSignUp
                ? 'Join us for the freshest groceries delivered to your door'
                : 'Sign in to access your personalized shopping experience'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <SignForm isSignUp={true} />
    </div>
  )
}