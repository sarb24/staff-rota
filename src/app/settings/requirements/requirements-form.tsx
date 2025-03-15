"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ShiftType } from "@/types/scheduling"

interface ShiftRequirement {
  type: ShiftType
  requiredStaff: number
  hours: number
}

interface Requirements {
  shifts: ShiftRequirement[]
  weeklyRequiredShifts: number
  weeklyRequiredHours: number
  totalContractedHours: number
}

const DEFAULT_REQUIREMENTS: Requirements = {
  shifts: [
    { type: "morning", requiredStaff: 2, hours: 8.0 },
    { type: "day", requiredStaff: 3, hours: 8.0 },
    { type: "afternoon", requiredStaff: 2, hours: 8.0 },
    { type: "night", requiredStaff: 1, hours: 8.0 },
  ],
  weeklyRequiredShifts: 56,
  weeklyRequiredHours: 448.0,
  totalContractedHours: 38.0,
}

export default function RequirementsForm() {
  const [requirements, setRequirements] = useState<Requirements>(DEFAULT_REQUIREMENTS)

  const handleShiftChange = (type: ShiftType, field: "requiredStaff" | "hours", value: string) => {
    setRequirements(prev => ({
      ...prev,
      shifts: prev.shifts.map(shift =>
        shift.type === type
          ? { ...shift, [field]: parseFloat(value) || 0 }
          : shift
      ),
    }))
  }

  const handleWeeklyChange = (field: keyof Requirements, value: string) => {
    setRequirements(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Required Staff per Shift</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {requirements.shifts.map(shift => (
              <div key={shift.type} className="grid grid-cols-3 gap-4 items-center">
                <Label className="capitalize">{shift.type}</Label>
                <div className="space-y-2">
                  <Label>Staff Required</Label>
                  <Input
                    type="number"
                    value={shift.requiredStaff}
                    onChange={(e) => handleShiftChange(shift.type, "requiredStaff", e.target.value)}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hours</Label>
                  <Input
                    type="number"
                    value={shift.hours}
                    onChange={(e) => handleShiftChange(shift.type, "hours", e.target.value)}
                    min={0}
                    step={0.5}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Required Shifts/Week</Label>
                <Input
                  type="number"
                  value={requirements.weeklyRequiredShifts}
                  onChange={(e) => handleWeeklyChange("weeklyRequiredShifts", e.target.value)}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label>Required Hours/Week</Label>
                <Input
                  type="number"
                  value={requirements.weeklyRequiredHours}
                  onChange={(e) => handleWeeklyChange("weeklyRequiredHours", e.target.value)}
                  min={0}
                  step={0.5}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Contracted Hours/Week</Label>
              <Input
                type="number"
                value={requirements.totalContractedHours}
                onChange={(e) => handleWeeklyChange("totalContractedHours", e.target.value)}
                min={0}
                step={0.5}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
} 