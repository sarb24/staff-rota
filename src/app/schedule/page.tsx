"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StaffSchedulingCalendar from "@/components/staff-scheduling-calendar"
import StaffScheduleList from "@/components/staff-schedule-list"
import { useStaff } from "@/contexts/StaffContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SchedulePage() {
  const { staff } = useStaff()

  if (staff.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Staff Members Found</h2>
          <p className="text-muted-foreground mb-8">Add staff members to start creating schedules</p>
          <Button asChild>
            <Link href="/staff/new">Add Your First Staff Member</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="h-10 w-10 p-0" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Schedule</h1>
          <p className="text-muted-foreground">
            View and manage staff schedules
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="mt-4">
              <StaffSchedulingCalendar />
            </TabsContent>
            <TabsContent value="list" className="mt-4">
              <StaffScheduleList />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
} 