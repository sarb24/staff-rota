"use client"

import { Card, CardContent } from "@/components/ui/card"
import StaffSchedulingCalendar from "@/components/staff-scheduling-calendar"

export default function Calendar() {
  return (
    <Card>
      <CardContent className="p-6">
        <StaffSchedulingCalendar />
      </CardContent>
    </Card>
  )
} 