"use client"
import { Button } from "@/components/ui/button";
import { Phone, ShoppingCart, HelpCircle, LogIn, Search, User } from 'lucide-react';
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

export default function Header() {
  const isAuthenticated = false;
  const username = "Reza";
  return (
    <div className="flex flex-col border-b w-full sticky top-0 z-50 bg-primary shadow-sm">
      <header className="flex items-center justify-between px-4 py-3 md:px-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <img src="/logoipsum-364.png" alt="" className="h-8 w-32" />
        </div>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-[#E11D48] data-[active]:text-[#E11D48] data-[state=open]:text-[#E11D48]">
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md hover:bg-gray-50"
                        href="/"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-[#E11D48] data-[active]:text-[#E11D48] data-[state=open]:text-[#E11D48]">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} hover:text-[#E11D48] data-[active]:text-[#E11D48]`}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <SearchInput />

        <div className="flex items-center space-x-2 md:space-x-3">
          <Button className="rounded-full hover:bg-transparent" variant={"ghost"}>
            <div className="relative">
              <ShoppingCart className="size-6 text-gray-700 hover:text-[#E11D48]" />
              <div className="absolute bg-[#E11D48] rounded-full text-white text-xs w-5 h-5 flex items-center justify-center -top-2 -right-2">
                24
              </div>
            </div>
          </Button>

          <Button className="rounded-full hover:bg-transparent hidden md:block" variant={"ghost"}>
            <HelpCircle className="size-6 p-0 text-gray-700 hover:text-[#E11D48]" />
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3 rounded-lg hover:bg-accent px-3 py-2">
              <Avatar className="size-8 md:size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-[#E11D48] hidden md:block">{`Hello, ${username}`}</span>
            </div>
          ) : (
            <>
              <Link href={"/signin"}>
                <Button variant={"outline"} className="hidden md:flex items-center border border-[#E11D48] shadow-sm text-[#E11D48] hover:text-white hover:bg-[#E11D48] duration-300">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button variant={"ghost"} size="icon" className="md:hidden">
                  <User className="h-5 w-5 text-gray-700 hover:text-[#E11D48]" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-[#E11D48] focus:bg-gray-50">
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
      <div className="relative hidden md:flex items-center w-full max-w-md mx-4 group">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="pl-10 pr-8 py-2 h-9 rounded-md border border-gray-300 focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/20 w-full transition-all"
          />
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-600 hover:text-[#E11D48] hover:bg-transparent"
        onClick={() => setShowMobileSearch(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex items-start">
          <div className="flex items-center w-full mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 h-10 rounded-md border border-gray-300 w-full focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/20"
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