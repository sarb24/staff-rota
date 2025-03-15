"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useSettings } from "@/contexts/SettingsContext"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Clock, Minus, Plus, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function StaffRequirementsPage() {
  const { shifts, weeklyRequirements, updateShifts, updateWeeklyRequirements } = useSettings()

  const handleShiftChange = (index: number, field: "requiredStaff" | "hours", value: number) => {
    const newShifts = [...shifts]
    newShifts[index] = { ...newShifts[index], [field]: value }
    updateShifts(newShifts)
  }

  const handleWeeklyRequirementsChange = (field: keyof typeof weeklyRequirements, value: number) => {
    updateWeeklyRequirements({ ...weeklyRequirements, [field]: value })
  }

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  const totalRequiredHours = shifts.reduce(
    (total, shift) => total + shift.requiredStaff * shift.hours * 7,
    0
  )

  const totalRequiredStaff = shifts.reduce(
    (total, shift) => total + shift.requiredStaff,
    0
  )

  if (!shifts || !weeklyRequirements) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 items-center">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Staff Requirements</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shift Requirements</CardTitle>
            <CardDescription>
              Set the number of staff required for each shift type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {shifts.map((shift) => (
              <div key={shift.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{shift.name}</span>
                  <span className="text-sm text-muted-foreground">({shift.hours} hours)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShiftChange(shifts.indexOf(shift), "requiredStaff", shift.requiredStaff - 1)}
                    disabled={shift.requiredStaff <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{shift.requiredStaff}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShiftChange(shifts.indexOf(shift), "requiredStaff", shift.requiredStaff + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Requirements</CardTitle>
            <CardDescription>
              Set the minimum contracted hours per week for staff
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Minimum Hours/Week</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeeklyRequirementsChange("contractedHoursPerWeek", weeklyRequirements.contractedHoursPerWeek - 0.5)}
                  disabled={weeklyRequirements.contractedHoursPerWeek <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center">{weeklyRequirements.contractedHoursPerWeek.toFixed(1)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeeklyRequirementsChange("contractedHoursPerWeek", weeklyRequirements.contractedHoursPerWeek + 0.5)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">Total Required Staff</span>
              </div>
              <div className="text-lg font-semibold">
                {totalRequiredStaff}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Hours per Shift</span>
              </div>
              <div className="text-lg font-semibold">
                {shifts.map((shift) => (
                  <div key={shift.name} className="text-sm">
                    {shift.name}: {shift.requiredStaff * shift.hours} hours
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
} 