"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ShiftTypesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shift Types</h1>
        <p className="text-muted-foreground">
          Learn how to configure and manage different types of shifts in your organization
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Standard Shift Types</h2>
        <p>
          Default shift configurations:
        </p>
        <ul>
          <li>Morning Shift (8 hours)
            <ul>
              <li>Typical hours: 6:00 AM - 2:00 PM</li>
              <li>Standard break: 30 minutes</li>
            </ul>
          </li>
          <li>Day Shift (8 hours)
            <ul>
              <li>Typical hours: 2:00 PM - 10:00 PM</li>
              <li>Standard break: 30 minutes</li>
            </ul>
          </li>
          <li>Night Shift (12 hours)
            <ul>
              <li>Typical hours: 10:00 PM - 6:00 AM</li>
              <li>Standard breaks: 2 x 30 minutes</li>
            </ul>
          </li>
        </ul>

        <h2>Creating Custom Shifts</h2>
        <p>
          To create a new shift type:
        </p>
        <ol>
          <li>Go to Settings {`>`} Shift Types</li>
          <li>Click "Add New Shift Type"</li>
          <li>Configure shift details:
            <ul>
              <li>Shift name and code</li>
              <li>Start and end times</li>
              <li>Break durations</li>
              <li>Color coding</li>
            </ul>
          </li>
          <li>Save the configuration</li>
        </ol>

        <h2>Shift Requirements</h2>
        <p>
          Configure requirements for each shift type:
        </p>
        <ul>
          <li>Minimum staffing levels</li>
          <li>Required roles and skills</li>
          <li>Experience requirements</li>
          <li>Special qualifications</li>
          <li>Coverage patterns</li>
        </ul>

        <h2>Break Configuration</h2>
        <p>
          Set up break periods for shifts:
        </p>
        <ul>
          <li>Break duration and frequency</li>
          <li>Timing restrictions</li>
          <li>Coverage requirements</li>
          <li>Paid vs. unpaid breaks</li>
        </ul>

        <h2>Shift Patterns</h2>
        <p>
          Define recurring shift patterns:
        </p>
        <ul>
          <li>Weekly rotations</li>
          <li>Alternating schedules</li>
          <li>Fixed assignments</li>
          <li>Flexible patterns</li>
        </ul>

        <h2>Shift Rules</h2>
        <p>
          Set up shift-specific rules:
        </p>
        <ul>
          <li>Minimum rest periods</li>
          <li>Maximum consecutive shifts</li>
          <li>Overtime thresholds</li>
          <li>Holiday considerations</li>
        </ul>

        <h2>Managing Changes</h2>
        <p>
          Handle shift type modifications:
        </p>
        <ul>
          <li>Updating existing shifts</li>
          <li>Transitioning between patterns</li>
          <li>Handling exceptions</li>
          <li>Communication protocols</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Keep shift definitions clear and consistent</li>
            <li>Consider staff preferences when possible</li>
            <li>Maintain compliance with labor laws</li>
            <li>Review and update patterns regularly</li>
            <li>Document all shift type changes</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/settings/organization" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Organization Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/settings/working-hours" className="flex items-center gap-2">
            Working Hours
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 