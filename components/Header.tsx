"use client"
import { Button } from "@/components/ui/button";
import { ShoppingCart, HelpCircle, LogIn, Search, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { components } from "@/constants/ui";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CartSheet } from "./CartSheet";
import { UserNav } from "./UserNav";

export default function Header() {
  const isAuthenticated = true;
  const username = "Reza";

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <header className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logoipsum-364.png"
            alt="Company Logo"
            className="h-8 w-32 transition-opacity hover:opacity-80"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerStyle}>
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-gray-50"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          FreshMart
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Your premium grocery shopping experience
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/products" title="Browse Products">
                    Discover our wide selection of fresh groceries
                  </ListItem>
                  <ListItem href="/deals" title="Special Offers">
                    Current promotions and discounts
                  </ListItem>
                  <ListItem href="/recipes" title="Recipes">
                    Inspiration for your next meal
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerStyle}>
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navLinkStyle)}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <SearchInput />

        {/* User Actions */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <CartSheet />


          <Link href={"/help"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full hover:bg-gray-100 md:flex"
              aria-label="Help Center"
            >
              <HelpCircle className="h-5 w-5 text-gray-700 transition-colors hover:text-[#E11D48]" />
            </Button>
          </Link>

          {isAuthenticated ? (
            <UserNav username={username} />
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="hidden items-center border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white md:flex"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Sign In"
                >
                  <User className="h-5 w-5 text-gray-700 transition-colors hover:text-[#E11D48]" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

// Reusable styles
const navTriggerStyle = "text-sm font-medium text-gray-800 hover:text-[#E11D48] data-[active]:text-[#E11D48] data-[state=open]:text-[#E11D48]"
const navLinkStyle = "text-sm font-medium text-gray-800 hover:text-[#E11D48]"

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-[#E11D48] focus:bg-gray-50"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export function SearchInput() {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      {/* Desktop Search */}
      <div className="relative hidden md:flex items-center w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search products..."
          className="h-9 w-full rounded-md pl-9 pr-4 transition-all focus-visible:ring-[#E11D48]"
        />
      </div>

      {/* Mobile Search Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-700 hover:bg-gray-100 hover:text-[#E11D48] md:hidden"
        onClick={() => setShowMobileSearch(true)}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 flex items-start bg-white p-4">
          <div className="flex w-full items-center mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-md pl-9 pr-4 focus-visible:ring-[#E11D48]"
              />
            </div>
            <Button
              variant="ghost"
              className="ml-2 text-[#E11D48]"
              onClick={() => setShowMobileSearch(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}