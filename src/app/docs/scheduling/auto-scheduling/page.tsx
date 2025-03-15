"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function AutoSchedulingPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Auto-Scheduling</h1>
        <p className="text-muted-foreground">
          Learn how to use the automatic scheduling feature to create efficient staff schedules
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Getting Started</h2>
        <p>
          Auto-scheduling helps create optimal schedules by considering:
        </p>
        <ul>
          <li>Staff availability and preferences</li>
          <li>Required coverage for each shift</li>
          <li>Role requirements and qualifications</li>
          <li>Working hour constraints</li>
          <li>Fair distribution of shifts</li>
        </ul>

        <h2>Prerequisites</h2>
        <p>
          Before using auto-scheduling, ensure:
        </p>
        <ul>
          <li>Staff profiles are complete with:
            <ul>
              <li>Contracted hours</li>
              <li>Availability patterns</li>
              <li>Role assignments</li>
              <li>Qualifications</li>
            </ul>
          </li>
          <li>Shift requirements are defined</li>
          <li>Working patterns are configured</li>
        </ul>

        <h2>Configuration</h2>
        <p>
          Set up auto-scheduling preferences:
        </p>
        <ol>
          <li>Go to Settings {`>`} Auto-Scheduling</li>
          <li>Configure scheduling rules:
            <ul>
              <li>Maximum consecutive shifts</li>
              <li>Minimum rest periods</li>
              <li>Preferred shift patterns</li>
              <li>Distribution preferences</li>
            </ul>
          </li>
          <li>Set priority levels for different constraints</li>
          <li>Save your configuration</li>
        </ol>

        <h2>Running Auto-Schedule</h2>
        <p>
          To generate an automatic schedule:
        </p>
        <ol>
          <li>Select the scheduling period</li>
          <li>Review current constraints and requirements</li>
          <li>Click "Generate Schedule"</li>
          <li>Wait for the algorithm to complete</li>
          <li>Review the generated schedule</li>
        </ol>

        <h2>Optimization Criteria</h2>
        <p>
          The auto-scheduler optimizes for:
        </p>
        <ul>
          <li>Even distribution of shifts</li>
          <li>Compliance with working time regulations</li>
          <li>Staff preferences and requests</li>
          <li>Required skill mix per shift</li>
          <li>Cost efficiency</li>
        </ul>

        <h2>Manual Adjustments</h2>
        <p>
          After auto-scheduling:
        </p>
        <ul>
          <li>Review generated schedules</li>
          <li>Make necessary manual adjustments</li>
          <li>Address any conflicts or warnings</li>
          <li>Finalize and publish the schedule</li>
        </ul>

        <h2>Troubleshooting</h2>
        <p>
          Common issues and solutions:
        </p>
        <ul>
          <li>Insufficient staff coverage</li>
          <li>Uneven shift distribution</li>
          <li>Qualification mismatches</li>
          <li>Working time violations</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Keep staff profiles up to date</li>
            <li>Regularly review auto-scheduling settings</li>
            <li>Balance automation with manual oversight</li>
            <li>Monitor schedule quality and fairness</li>
            <li>Gather feedback for continuous improvement</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/scheduling/managing-shifts" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Managing Shifts
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/settings/organization" className="flex items-center gap-2">
            Organization Settings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 