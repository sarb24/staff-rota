"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StaffProvider } from "@/contexts/StaffContext"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  withStaffProvider?: boolean
}

export function PageLayout({ 
  children, 
  title, 
  description, 
  withStaffProvider = false 
}: PageLayoutProps) {
  const content = (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-3 md:p-8 space-y-6">
      <div className="flex flex-col gap-3 md:gap-4 max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary/90 to-primary text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground/80">
          {description}
        </p>
      </div>
      <Card className="flex-1 border-t-4 border-t-primary/80 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardContent className="p-4 md:p-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (withStaffProvider) {
    return <StaffProvider>{content}</StaffProvider>
  }

  return content
} 