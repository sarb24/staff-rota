"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function IntroductionPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Introduction to Staff Rota</h1>
        <p className="text-muted-foreground">
          Welcome to Staff Rota - Your complete solution for staff scheduling and management
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>What is Staff Rota?</h2>
        <p>
          Staff Rota is a comprehensive staff scheduling and management system designed to help organizations efficiently manage their workforce. Whether you're running a small business or managing a large team, Staff Rota provides the tools you need to create and maintain effective work schedules.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Intuitive Schedule Management:</strong> Create and manage staff schedules with an easy-to-use interface
          </li>
          <li>
            <strong>Smart Auto-scheduling:</strong> Automatically generate schedules based on staff availability and requirements
          </li>
          <li>
            <strong>Staff Management:</strong> Keep track of staff information, availability, and working preferences
          </li>
          <li>
            <strong>Real-time Updates:</strong> Changes to schedules are instantly reflected and communicated to staff
          </li>
          <li>
            <strong>Customizable Settings:</strong> Adapt the system to your organization's specific needs
          </li>
        </ul>

        <h2>Who is it for?</h2>
        <p>
          Staff Rota is perfect for:
        </p>
        <ul>
          <li>Small to medium-sized businesses</li>
          <li>Healthcare facilities</li>
          <li>Retail stores</li>
          <li>Restaurants and hospitality</li>
          <li>Any organization that needs to manage staff schedules</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          To get started with Staff Rota, we recommend following these steps:
        </p>
        <ol>
          <li>Set up your organization's basic information</li>
          <li>Add your staff members</li>
          <li>Configure shift types and working hours</li>
          <li>Create your first schedule</li>
        </ol>
        <p>
          Follow our Quick Start Guide for detailed instructions on each step.
        </p>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/getting-started/quick-start" className="flex items-center gap-2">
            Quick Start Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 