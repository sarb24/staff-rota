"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function QuickStartPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quick Start Guide</h1>
        <p className="text-muted-foreground">
          Get up and running with Staff Rota in minutes
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Setting Up Your Organization</h2>
        <p>
          First, you'll need to configure your organization's basic settings:
        </p>
        <ol>
          <li>Go to <Link href="/settings">Settings</Link></li>
          <li>Navigate to "Organization Settings"</li>
          <li>Enter your organization's name and details</li>
          <li>Configure your timezone and working week</li>
          <li>Save your changes</li>
        </ol>

        <h2>2. Adding Staff Members</h2>
        <p>
          Next, add your staff members to the system:
        </p>
        <ol>
          <li>Go to the <Link href="/staff">Staff</Link> section</li>
          <li>Click "Add Staff Member"</li>
          <li>Enter the staff member's details:
            <ul>
              <li>Name and contact information</li>
              <li>Contracted hours</li>
              <li>Available working days</li>
              <li>Shift preferences</li>
            </ul>
          </li>
          <li>Save the staff member's profile</li>
          <li>Repeat for all staff members</li>
        </ol>

        <h2>3. Configuring Shift Types</h2>
        <p>
          Set up the types of shifts your organization uses:
        </p>
        <ol>
          <li>Go to <Link href="/settings/requirements">Staff Requirements</Link></li>
          <li>Define your shift types (e.g., Morning, Afternoon, Night)</li>
          <li>Set the hours for each shift</li>
          <li>Specify how many staff are required for each shift</li>
          <li>Save your shift configurations</li>
        </ol>

        <h2>4. Creating Your First Schedule</h2>
        <p>
          Now you're ready to create your first schedule:
        </p>
        <ol>
          <li>Go to the <Link href="/schedule">Schedule</Link> page</li>
          <li>Select the week you want to schedule</li>
          <li>You can either:
            <ul>
              <li>Click "Generate Schedule" to automatically create a schedule based on your requirements</li>
              <li>Manually assign shifts by clicking on the schedule grid</li>
            </ul>
          </li>
          <li>Review the schedule and make any necessary adjustments</li>
          <li>The system will automatically check for:
            <ul>
              <li>Conflicts with staff availability</li>
              <li>Required rest periods between shifts</li>
              <li>Contracted hours compliance</li>
            </ul>
          </li>
        </ol>

        <h2>Next Steps</h2>
        <p>
          After completing these basic steps, you can:
        </p>
        <ul>
          <li>Fine-tune your settings</li>
          <li>Set up notifications</li>
          <li>Configure data backup options</li>
          <li>Explore advanced features</li>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/getting-started/introduction" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Introduction
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/getting-started/key-concepts" className="flex items-center gap-2">
            Key Concepts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 