"use client"

import { StaffProvider } from "@/contexts/StaffContext"
import { SettingsProvider } from "@/contexts/SettingsContext"
import { Toaster } from "sonner"
import { LayoutContent } from "@/components/layout-content"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="staff-rota-theme"
    >
      <StaffProvider>
        <SettingsProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
          <Toaster />
        </SettingsProvider>
      </StaffProvider>
    </ThemeProvider>
  )
} 