"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function KeyConceptsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Key Concepts</h1>
        <p className="text-muted-foreground">
          Understanding the fundamental concepts of Staff Rota
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Staff Members</h2>
        <p>
          Staff members are the core of your scheduling system. Each staff member has:
        </p>
        <ul>
          <li><strong>Contracted Hours:</strong> The number of hours they are contracted to work per week</li>
          <li><strong>Working Days:</strong> The days they are available to work</li>
          <li><strong>Shift Preferences:</strong> Which types of shifts they can or prefer to work</li>
          <li><strong>Contact Information:</strong> How to reach them regarding schedule changes</li>
        </ul>

        <h2>Shifts</h2>
        <p>
          Shifts are the building blocks of your schedule. Each shift has:
        </p>
        <ul>
          <li><strong>Type:</strong> The category of shift (e.g., Morning, Afternoon, Night)</li>
          <li><strong>Duration:</strong> How long the shift lasts (typically 8 or 12 hours)</li>
          <li><strong>Required Staff:</strong> How many staff members are needed for this shift</li>
          <li><strong>Time Period:</strong> When the shift starts and ends</li>
        </ul>

        <h2>Schedule</h2>
        <p>
          The schedule is where shifts are assigned to staff members. It follows these principles:
        </p>
        <ul>
          <li><strong>Weekly View:</strong> Primary view showing a full week of shifts</li>
          <li><strong>Monthly View:</strong> Overview of the entire month's schedule</li>
          <li><strong>Shift Coverage:</strong> Ensuring all required shifts are covered</li>
          <li><strong>Hours Tracking:</strong> Monitoring contracted hours vs. actual hours worked</li>
        </ul>

        <h2>Staff Requirements</h2>
        <p>
          Staff requirements define your organization's needs:
        </p>
        <ul>
          <li><strong>Daily Requirements:</strong> How many staff are needed each day</li>
          <li><strong>Shift Distribution:</strong> How shifts should be spread across the week</li>
          <li><strong>Minimum Rest Periods:</strong> Required time between shifts (typically 11 hours)</li>
          <li><strong>Maximum Consecutive Days:</strong> Limit on consecutive working days</li>
        </ul>

        <h2>Auto-scheduling</h2>
        <p>
          The auto-scheduling system follows these rules:
        </p>
        <ul>
          <li><strong>Staff Availability:</strong> Only schedules staff during their available days</li>
          <li><strong>Contract Compliance:</strong> Aims to meet contracted hours for each staff member</li>
          <li><strong>Fair Distribution:</strong> Distributes shifts evenly among available staff</li>
          <li><strong>Rest Periods:</strong> Ensures minimum rest periods between shifts</li>
        </ul>

        <h2>Working Hours</h2>
        <p>
          Working hours management includes:
        </p>
        <ul>
          <li><strong>Contracted Hours:</strong> Weekly hours each staff member should work</li>
          <li><strong>Actual Hours:</strong> Hours actually scheduled/worked</li>
          <li><strong>Overtime:</strong> Hours worked beyond contracted hours</li>
          <li><strong>Undertime:</strong> When scheduled hours fall below contracted hours</li>
        </ul>

        <h2>Settings</h2>
        <p>
          Key settings that affect how Staff Rota works:
        </p>
        <ul>
          <li><strong>Organization Settings:</strong> Basic setup of your organization</li>
          <li><strong>Shift Configurations:</strong> Defining your shift types and requirements</li>
          <li><strong>Working Patterns:</strong> Setting up standard working patterns</li>
          <li><strong>Notifications:</strong> How and when staff are notified of changes</li>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/getting-started/quick-start" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quick Start Guide
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/staff/adding-staff" className="flex items-center gap-2">
            Adding Staff Members
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 