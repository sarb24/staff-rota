"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { DayOfWeek, WorkingHoursConfig } from "@/types/scheduling"
import { DEFAULT_WORKING_HOURS } from "@/types/scheduling"
import { toast } from "sonner"

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

export function WorkingHoursConfig() {
  const [workingHours, setWorkingHours] = useState<WorkingHoursConfig>(() => {
    const saved = localStorage.getItem("working_hours")
    return saved ? JSON.parse(saved) : DEFAULT_WORKING_HOURS
  })

  const handleTimeChange = (day: DayOfWeek, field: "startTime" | "endTime", value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    try {
      localStorage.setItem("working_hours", JSON.stringify(workingHours))
      toast.success("Working hours saved successfully")
    } catch (error) {
      console.error("Error saving working hours:", error)
      toast.error("Error saving working hours")
    }
  }

  const handleReset = () => {
    setWorkingHours(DEFAULT_WORKING_HOURS)
    localStorage.removeItem("working_hours")
    toast.success("Working hours reset to defaults")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Working Hours Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="grid grid-cols-3 gap-4 items-center">
            <span className="font-medium">{day}</span>
            <div className="flex gap-2">
              <Input
                type="time"
                value={workingHours[day].startTime}
                onChange={(e) => handleTimeChange(day, "startTime", e.target.value)}
                className="w-32"
              />
              <span className="self-center">to</span>
              <Input
                type="time"
                value={workingHours[day].endTime}
                onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            Save Working Hours
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 