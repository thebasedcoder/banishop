"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Home, Package, Settings, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard/orders', label: 'Orders', icon: <Package /> },
  { href: '/dashboard/addresses', label: 'Addresses', icon: <Home /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <Settings /> },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          className={`w-full justify-start text-md px-4 py-6 ${pathname === item.href ? 'bg-[#E11D48]/10 text-[#E11D48]' : 'text-gray-700'}`}
        >
          <Link href={item.href}>
            {item.icon && <div className="mr-3">{item.icon}</div>}
            {item.label}
          </Link>
        </Button>
      ))}
      <Separator className="my-4" />
    </nav>
  );
}