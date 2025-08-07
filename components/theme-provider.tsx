"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// The 'ThemeProviderProps' type is now correctly inferred from the provider itself,
// instead of being imported from a deep, unstable path.
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}