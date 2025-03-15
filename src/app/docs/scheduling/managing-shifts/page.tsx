"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ManagingShiftsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Managing Shifts</h1>
        <p className="text-muted-foreground">
          Learn how to manage different types of shifts and their requirements
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Shift Types</h2>
        <p>
          Staff Rota supports various shift types:
        </p>
        <ul>
          <li>Morning Shift (8 hours)</li>
          <li>Day Shift (8 hours)</li>
          <li>Afternoon Shift (8 hours)</li>
          <li>Night Shift (12 hours)</li>
          <li>Custom shifts (configurable duration)</li>
        </ul>

        <h2>Configuring Shifts</h2>
        <p>
          To configure shift settings:
        </p>
        <ol>
          <li>Go to Settings {`>`} Shift Types</li>
          <li>For each shift type, set:
            <ul>
              <li>Start and end times</li>
              <li>Required break durations</li>
              <li>Minimum staff requirements</li>
              <li>Role requirements</li>
            </ul>
          </li>
          <li>Save your configurations</li>
        </ol>

        <h2>Staff Requirements</h2>
        <p>
          Define staffing needs for each shift:
        </p>
        <ul>
          <li>Minimum number of staff members</li>
          <li>Required roles and qualifications</li>
          <li>Experience level requirements</li>
          <li>Specific skill requirements</li>
        </ul>

        <h2>Break Management</h2>
        <p>
          Configure break periods:
        </p>
        <ul>
          <li>Break durations per shift length</li>
          <li>Timing of breaks during shifts</li>
          <li>Coverage during breaks</li>
          <li>Break rotation planning</li>
        </ul>

        <h2>Shift Patterns</h2>
        <p>
          Create and manage shift patterns:
        </p>
        <ul>
          <li>Weekly rotation patterns</li>
          <li>Alternating shift schedules</li>
          <li>Fixed shift assignments</li>
          <li>Flexible scheduling options</li>
        </ul>

        <h2>Shift Handover</h2>
        <p>
          Manage shift transitions:
        </p>
        <ul>
          <li>Handover procedures</li>
          <li>Documentation requirements</li>
          <li>Task completion status</li>
          <li>Communication protocols</li>
        </ul>

        <h2>Shift Monitoring</h2>
        <p>
          Track shift performance:
        </p>
        <ul>
          <li>Attendance tracking</li>
          <li>Coverage monitoring</li>
          <li>Break compliance</li>
          <li>Performance metrics</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Maintain consistent shift patterns where possible</li>
            <li>Ensure adequate rest periods between shifts</li>
            <li>Monitor staff workload and fatigue</li>
            <li>Regular review of shift effectiveness</li>
            <li>Keep clear documentation of shift changes</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/scheduling/creating-schedules" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Creating Schedules
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/scheduling/auto-scheduling" className="flex items-center gap-2">
            Auto-Scheduling
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 