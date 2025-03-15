"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function RolesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Managing Roles</h1>
        <p className="text-muted-foreground">
          Learn how to manage staff roles and responsibilities
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding Roles</h2>
        <p>
          Roles help organize staff members by their responsibilities:
        </p>
        <ul>
          <li>Define job titles and positions</li>
          <li>Set required qualifications</li>
          <li>Specify shift responsibilities</li>
          <li>Establish reporting structures</li>
        </ul>

        <h2>Creating Roles</h2>
        <p>
          To create a new role:
        </p>
        <ol>
          <li>Go to Settings {`>`} Roles</li>
          <li>Click "Add New Role"</li>
          <li>Define role details:
            <ul>
              <li>Role title</li>
              <li>Description</li>
              <li>Required qualifications</li>
              <li>Shift types they can work</li>
            </ul>
          </li>
          <li>Save the role configuration</li>
        </ol>

        <h2>Role Requirements</h2>
        <p>
          Set specific requirements for each role:
        </p>
        <ul>
          <li>Minimum qualifications needed</li>
          <li>Experience requirements</li>
          <li>Certifications needed</li>
          <li>Special skills or training</li>
        </ul>

        <h2>Shift Coverage</h2>
        <p>
          Configure how roles affect scheduling:
        </p>
        <ul>
          <li>Required number of each role per shift</li>
          <li>Role combinations needed</li>
          <li>Minimum experience levels</li>
          <li>Backup coverage requirements</li>
        </ul>

        <h2>Role Permissions</h2>
        <p>
          Define what each role can do:
        </p>
        <ul>
          <li>Schedule viewing permissions</li>
          <li>Schedule editing abilities</li>
          <li>Staff management access</li>
          <li>Report access levels</li>
        </ul>

        <h2>Managing Role Changes</h2>
        <p>
          Handle role transitions and updates:
        </p>
        <ul>
          <li>Promoting staff members</li>
          <li>Changing responsibilities</li>
          <li>Updating qualifications</li>
          <li>Training requirements</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Keep role definitions clear and specific</li>
            <li>Regularly review role requirements</li>
            <li>Maintain up-to-date qualification records</li>
            <li>Document role changes and transitions</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/staff/availability" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Setting Availability
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/scheduling/creating-schedules" className="flex items-center gap-2">
            Creating Schedules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 