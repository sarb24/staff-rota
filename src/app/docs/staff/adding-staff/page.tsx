"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function AddingStaffPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Adding Staff Members</h1>
        <p className="text-muted-foreground">
          Learn how to add and manage staff members in Staff Rota
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Adding a New Staff Member</h2>
        <p>
          To add a new staff member to Staff Rota:
        </p>
        <ol>
          <li>Navigate to the <Link href="/staff">Staff</Link> page</li>
          <li>Click the "Add Staff Member" button</li>
          <li>Fill in the required information:
            <ul>
              <li>Full name</li>
              <li>Email address (for notifications)</li>
              <li>Contact number (optional)</li>
              <li>Role or position</li>
            </ul>
          </li>
          <li>Click "Save" to create the staff member profile</li>
        </ol>

        <h2>Setting Contracted Hours</h2>
        <p>
          Each staff member needs their contracted hours specified:
        </p>
        <ul>
          <li>Enter the number of hours per week (e.g., 37.5)</li>
          <li>This can be adjusted in increments of 0.5 hours</li>
          <li>The system will use this to track hours allocation</li>
          <li>Overtime and undertime will be calculated based on this</li>
        </ul>

        <h2>Working Days and Availability</h2>
        <p>
          Configure when staff members can work:
        </p>
        <ul>
          <li>Select which days of the week they can work</li>
          <li>Specify any recurring unavailability</li>
          <li>Set preferred shifts (Morning, Afternoon, Night)</li>
          <li>Add notes about specific availability requirements</li>
        </ul>

        <h2>Shift Preferences</h2>
        <p>
          Set up shift preferences to help with scheduling:
        </p>
        <ul>
          <li>Select which shifts the staff member can work</li>
          <li>Indicate preferred shifts</li>
          <li>Note any shift restrictions</li>
          <li>Specify maximum consecutive shifts</li>
        </ul>

        <h2>Additional Information</h2>
        <p>
          You can also add:
        </p>
        <ul>
          <li>Emergency contact details</li>
          <li>Qualifications and certifications</li>
          <li>Special notes or requirements</li>
          <li>Start date and probation period</li>
        </ul>

        <h2>Managing Staff Profiles</h2>
        <p>
          After creating a staff profile, you can:
        </p>
        <ul>
          <li>Edit any information at any time</li>
          <li>View their schedule history</li>
          <li>Track hours worked vs. contracted hours</li>
          <li>Manage their availability and preferences</li>
          <li>Deactivate profiles for staff who have left</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Keep staff information up to date</li>
            <li>Regularly review contracted hours</li>
            <li>Update availability as soon as changes are known</li>
            <li>Document any special arrangements</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/getting-started/key-concepts" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Key Concepts
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/staff/availability" className="flex items-center gap-2">
            Setting Availability
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 