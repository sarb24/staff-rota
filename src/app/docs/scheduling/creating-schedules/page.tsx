"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function CreatingSchedulesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Creating Schedules</h1>
        <p className="text-muted-foreground">
          Learn how to create and manage staff schedules effectively
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Schedule Creation Process</h2>
        <p>
          Creating a schedule involves several key steps:
        </p>
        <ol>
          <li>Select the scheduling period (week/month)</li>
          <li>Review staff availability</li>
          <li>Check staff requirements for each shift</li>
          <li>Allocate staff to shifts</li>
          <li>Review and adjust as needed</li>
        </ol>

        <h2>Manual Scheduling</h2>
        <p>
          To manually create a schedule:
        </p>
        <ol>
          <li>Navigate to the Schedule page</li>
          <li>Select the desired time period</li>
          <li>Click on a shift slot to assign staff:
            <ul>
              <li>View available staff members</li>
              <li>Check their contracted hours</li>
              <li>Verify role requirements</li>
              <li>Confirm availability</li>
            </ul>
          </li>
          <li>Save changes after each assignment</li>
        </ol>

        <h2>Auto-Scheduling</h2>
        <p>
          Using the auto-scheduling feature:
        </p>
        <ul>
          <li>Set scheduling preferences:
            <ul>
              <li>Fair distribution of shifts</li>
              <li>Role coverage requirements</li>
              <li>Maximum consecutive shifts</li>
              <li>Break periods</li>
            </ul>
          </li>
          <li>Run the auto-scheduler</li>
          <li>Review generated schedule</li>
          <li>Make manual adjustments if needed</li>
        </ul>

        <h2>Schedule Constraints</h2>
        <p>
          Important factors to consider:
        </p>
        <ul>
          <li>Staff availability windows</li>
          <li>Required qualifications per shift</li>
          <li>Maximum working hours</li>
          <li>Break requirements</li>
          <li>Role distribution</li>
        </ul>

        <h2>Managing Changes</h2>
        <p>
          Handle schedule modifications:
        </p>
        <ul>
          <li>Swap shifts between staff</li>
          <li>Cover unexpected absences</li>
          <li>Adjust for time-off requests</li>
          <li>Handle emergency changes</li>
        </ul>

        <h2>Schedule Review</h2>
        <p>
          Before finalizing the schedule:
        </p>
        <ul>
          <li>Check coverage requirements are met</li>
          <li>Verify contracted hours allocation</li>
          <li>Ensure fair distribution of shifts</li>
          <li>Review any conflicts or warnings</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Create schedules well in advance</li>
            <li>Consider staff preferences when possible</li>
            <li>Maintain consistent patterns where appropriate</li>
            <li>Keep communication channels open for changes</li>
            <li>Regularly review and optimize scheduling patterns</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/staff/roles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Managing Roles
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/scheduling/managing-shifts" className="flex items-center gap-2">
            Managing Shifts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 