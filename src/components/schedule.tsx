"use client"

import { Card, CardContent } from "@/components/ui/card"
import StaffProfile from "@/components/staff-profile"

export default function Schedule() {
  return (
    <Card>
      <CardContent className="p-6">
        <StaffProfile />
      </CardContent>
    </Card>
  )
} 