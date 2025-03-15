"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function WorkingHoursPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Working Hours</h1>
        <p className="text-muted-foreground">
          Learn how to manage working hours and patterns for your staff
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Contracted Hours</h2>
        <p>
          Managing staff contracted hours:
        </p>
        <ul>
          <li>Setting weekly contracted hours</li>
          <li>Full-time vs. part-time patterns</li>
          <li>Flexible working arrangements</li>
          <li>Hour tracking and monitoring</li>
        </ul>

        <h2>Working Patterns</h2>
        <p>
          Configure working patterns:
        </p>
        <ul>
          <li>Regular working days</li>
          <li>Shift rotation patterns</li>
          <li>Weekend working</li>
          <li>Flexible hours</li>
          <li>Compressed hours</li>
        </ul>

        <h2>Hour Restrictions</h2>
        <p>
          Set up working hour limits:
        </p>
        <ul>
          <li>Maximum weekly hours</li>
          <li>Daily working limits</li>
          <li>Rest period requirements</li>
          <li>Break time regulations</li>
          <li>Overtime thresholds</li>
        </ul>

        <h2>Time Management</h2>
        <p>
          Track and manage working time:
        </p>
        <ul>
          <li>Time recording methods</li>
          <li>Overtime calculation</li>
          <li>TOIL arrangements</li>
          <li>Holiday accrual</li>
        </ul>

        <h2>Availability Settings</h2>
        <p>
          Configure availability preferences:
        </p>
        <ul>
          <li>Preferred working hours</li>
          <li>Unavailable periods</li>
          <li>Maximum consecutive days</li>
          <li>Rotation preferences</li>
        </ul>

        <h2>Compliance</h2>
        <p>
          Ensure working time compliance:
        </p>
        <ul>
          <li>Working Time Regulations</li>
          <li>Minimum rest periods</li>
          <li>Night work restrictions</li>
          <li>Record keeping requirements</li>
        </ul>

        <h2>Reporting</h2>
        <p>
          Monitor working hours:
        </p>
        <ul>
          <li>Hours worked reports</li>
          <li>Pattern compliance</li>
          <li>Overtime tracking</li>
          <li>Rest break monitoring</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Regular review of working patterns</li>
            <li>Monitor work-life balance</li>
            <li>Ensure fair distribution of hours</li>
            <li>Maintain accurate records</li>
            <li>Address pattern issues promptly</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/settings/shift-types" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Shift Types
          </Link>
        </Button>
      </div>
    </div>
  )
} 