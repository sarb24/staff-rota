"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function AvailabilityPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Setting Availability</h1>
        <p className="text-muted-foreground">
          Learn how to manage staff availability and working patterns
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Working Days</h2>
        <p>
          Configure which days staff members can work:
        </p>
        <ul>
          <li>Select regular working days (e.g., Monday to Friday)</li>
          <li>Set weekend availability</li>
          <li>Specify if certain days are preferred</li>
          <li>Mark days as unavailable</li>
        </ul>

        <h2>Shift Availability</h2>
        <p>
          Define which shifts staff can work:
        </p>
        <ul>
          <li>Morning shifts (typically 8-hour day shifts)</li>
          <li>Afternoon shifts (typically 8-hour evening shifts)</li>
          <li>Night shifts (typically 12-hour night shifts)</li>
          <li>Specific time restrictions within shifts</li>
        </ul>

        <h2>Regular Patterns</h2>
        <p>
          Set up recurring availability patterns:
        </p>
        <ul>
          <li>Weekly patterns (e.g., every Monday and Wednesday)</li>
          <li>Alternating weeks (e.g., week on/week off)</li>
          <li>Custom rotation patterns</li>
          <li>School term patterns</li>
        </ul>

        <h2>Time Off and Leave</h2>
        <p>
          Manage various types of unavailability:
        </p>
        <ul>
          <li>Annual leave/vacation time</li>
          <li>Sick leave</li>
          <li>Training days</li>
          <li>Other absences</li>
        </ul>

        <h2>Temporary Changes</h2>
        <p>
          Handle temporary availability changes:
        </p>
        <ul>
          <li>One-off unavailability</li>
          <li>Short-term schedule changes</li>
          <li>Temporary restrictions</li>
          <li>Cover for other staff</li>
        </ul>

        <h2>Preferences</h2>
        <p>
          Record staff preferences for better scheduling:
        </p>
        <ul>
          <li>Preferred shifts and times</li>
          <li>Maximum consecutive working days</li>
          <li>Minimum rest periods</li>
          <li>Specific day preferences</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Update availability as soon as changes are known</li>
            <li>Consider work-life balance when setting patterns</li>
            <li>Maintain fair distribution of desirable shifts</li>
            <li>Document all availability changes</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/staff/adding-staff" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Adding Staff Members
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/staff/roles" className="flex items-center gap-2">
            Managing Roles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 