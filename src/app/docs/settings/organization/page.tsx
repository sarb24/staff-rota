"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function OrganizationSettingsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Organization Settings</h1>
        <p className="text-muted-foreground">
          Learn how to configure your organization's settings and preferences
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>General Settings</h2>
        <p>
          Configure basic organization details:
        </p>
        <ul>
          <li>Organization name and contact details</li>
          <li>Business hours and time zone</li>
          <li>Department structure</li>
          <li>Location settings</li>
        </ul>

        <h2>Staff Settings</h2>
        <p>
          Configure staff-related settings:
        </p>
        <ul>
          <li>Default working hours</li>
          <li>Standard shift patterns</li>
          <li>Overtime rules</li>
          <li>Break policies</li>
          <li>Leave management</li>
        </ul>

        <h2>Schedule Settings</h2>
        <p>
          Define scheduling preferences:
        </p>
        <ul>
          <li>Schedule view options</li>
          <li>Default schedule period</li>
          <li>Publication settings</li>
          <li>Notification preferences</li>
        </ul>

        <h2>Role Management</h2>
        <p>
          Configure role-based settings:
        </p>
        <ul>
          <li>Role definitions and hierarchies</li>
          <li>Required qualifications</li>
          <li>Skill matrices</li>
          <li>Training requirements</li>
        </ul>

        <h2>Compliance Settings</h2>
        <p>
          Set up compliance requirements:
        </p>
        <ul>
          <li>Working time regulations</li>
          <li>Break requirements</li>
          <li>Qualification tracking</li>
          <li>Audit trail settings</li>
        </ul>

        <h2>Notifications</h2>
        <p>
          Configure system notifications:
        </p>
        <ul>
          <li>Schedule publication alerts</li>
          <li>Shift change notifications</li>
          <li>Coverage warnings</li>
          <li>Compliance alerts</li>
        </ul>

        <h2>Access Control</h2>
        <p>
          Manage system access:
        </p>
        <ul>
          <li>User roles and permissions</li>
          <li>Authentication settings</li>
          <li>Access restrictions</li>
          <li>Security policies</li>
        </ul>

        <div className="bg-muted p-4 rounded-lg mt-6">
          <h3>Best Practices</h3>
          <ul>
            <li>Review settings regularly</li>
            <li>Document policy changes</li>
            <li>Communicate updates to staff</li>
            <li>Maintain audit trails</li>
            <li>Test changes before implementation</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="/docs/scheduling/auto-scheduling" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Auto-Scheduling
          </Link>
        </Button>
        <Button asChild>
          <Link href="/docs/settings/shift-types" className="flex items-center gap-2">
            Shift Types
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 