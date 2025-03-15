"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const

type DayOfWeek = typeof daysOfWeek[number]

interface DaySchedule {
  isWorking: boolean
  start: string
  end: string
}

interface WorkingHours {
  [key: string]: DaySchedule
}

export default function WorkingHoursPage() {
  const [workingHours, setWorkingHours] = React.useState<WorkingHours>(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: {
        isWorking: true,
        start: "09:00",
        end: "17:00"
      }
    }), {} as WorkingHours)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save working hours logic here
    console.log(workingHours)
  }

  const handleDayToggle = (day: DayOfWeek) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isWorking: !prev[day].isWorking
      }
    }))
  }

  const handleTimeChange = (day: DayOfWeek, field: "start" | "end", value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Working Hours</h1>
            <p className="text-gray-600">Set default working hours for your team</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/guide">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guide
            </Link>
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            {daysOfWeek.map(day => (
              <div key={day} className="flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-32">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={workingHours[day].isWorking}
                      onChange={() => handleDayToggle(day)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">{day}</span>
                  </label>
                </div>
                
                {workingHours[day].isWorking && (
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Start:</label>
                      <Input
                        type="time"
                        value={workingHours[day].start}
                        onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">End:</label>
                      <Input
                        type="time"
                        value={workingHours[day].end}
                        onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                        className="w-32"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button type="submit">Save Working Hours</Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/settings">Cancel</Link>
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">
            These hours will be used as the default when creating new schedules. You can override them for individual staff members or specific dates.
          </p>
        </div>
      </div>
    </div>
  )
} 