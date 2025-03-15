"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Users, Calendar, Settings } from "lucide-react"

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of Staff Rota",
      icon: BookOpen,
      items: [
        { title: "Introduction", href: "/docs/getting-started/introduction" },
        { title: "Quick Start Guide", href: "/docs/getting-started/quick-start" },
        { title: "Key Concepts", href: "/docs/getting-started/key-concepts" }
      ]
    },
    {
      title: "Staff Management",
      description: "Managing your staff and their schedules",
      icon: Users,
      items: [
        { title: "Adding Staff Members", href: "/docs/staff/adding-staff" },
        { title: "Setting Availability", href: "/docs/staff/availability" },
        { title: "Managing Roles", href: "/docs/staff/roles" }
      ]
    },
    {
      title: "Scheduling",
      description: "Creating and managing schedules",
      icon: Calendar,
      items: [
        { title: "Creating Schedules", href: "/docs/scheduling/creating-schedules" },
        { title: "Managing Shifts", href: "/docs/scheduling/managing-shifts" },
        { title: "Auto-scheduling", href: "/docs/scheduling/auto-scheduling" }
      ]
    },
    {
      title: "Settings & Configuration",
      description: "Customize Staff Rota for your needs",
      icon: Settings,
      items: [
        { title: "Organization Settings", href: "/docs/settings/organization" },
        { title: "Shift Types", href: "/docs/settings/shift-types" },
        { title: "Working Hours", href: "/docs/settings/working-hours" }
      ]
    }
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to use Staff Rota effectively for your organization
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                <CardTitle>{section.title}</CardTitle>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Button variant="link" asChild className="h-auto p-0">
                      <Link href={item.href} className="flex items-center justify-between w-full text-left">
                        <span>{item.title}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Can't find what you're looking for in the documentation?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Visit our Help Center for additional support options or contact our support team.
          </p>
          <Button asChild>
            <Link href="/help">Visit Help Center</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 