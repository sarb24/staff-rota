"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Sliders } from "lucide-react"

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Staff Requirements",
      description: "Configure staff requirements, shift patterns, and working hours",
      icon: Users,
      href: "/settings/requirements"
    },
    {
      title: "Schedule Settings",
      description: "Customize schedule display and behavior",
      icon: Calendar,
      href: "/settings/schedule"
    },
    {
      title: "General Settings",
      description: "Configure general application settings",
      icon: Sliders,
      href: "/settings/general"
    }
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your Staff Rota settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={section.href}>Configure {section.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 