"use client"

import React, { useState } from "react"
import { useStaff } from "@/contexts/StaffContext"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSettings } from "@/contexts/SettingsContext"

const StaffScheduleList = () => {
  const { staff, schedule } = useStaff()
  const { shifts } = useSettings()
  const [selectedWeek, setSelectedWeek] = useState<string>(format(new Date(), 'yyyy-MM-dd'))

  // Get the start and end of the selected week
  const weekStart = startOfWeek(new Date(selectedWeek), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(selectedWeek), { weekStartsOn: 1 })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Get all weeks for the select dropdown (last 4 weeks and next 8 weeks)
  const getWeekOptions = () => {
    const weeks = []
    const today = new Date()
    const fourWeeksAgo = new Date()
    fourWeeksAgo.setDate(today.getDate() - 28)
    const eightWeeksLater = new Date()
    eightWeeksLater.setDate(today.getDate() + 56)

    for (let d = fourWeeksAgo; d <= eightWeeksLater; d.setDate(d.getDate() + 7)) {
      const weekStart = startOfWeek(new Date(d), { weekStartsOn: 1 })
      weeks.push({
        value: format(weekStart, 'yyyy-MM-dd'),
        label: `Week of ${format(weekStart, 'MMM d, yyyy')}`
      })
    }
    return weeks
  }

  // Get shifts for a specific employee on a specific day
  const getShiftsForDay = (employeeId: number, date: Date) => {
    return schedule.filter(entry => 
      entry.employeeId === employeeId && 
      format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  // Calculate total hours for an employee in the selected week
  const calculateWeeklyHours = (employeeId: number) => {
    let totalHours = 0
    daysInWeek.forEach(day => {
      const dayShifts = getShiftsForDay(employeeId, day)
      dayShifts.forEach(shift => {
        const shiftConfig = shifts.find(s => s.name === shift.shift)
        if (shiftConfig) {
          totalHours += shiftConfig.hours
        }
      })
    })
    return totalHours
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={selectedWeek}
          onValueChange={setSelectedWeek}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            {getWeekOptions().map((week) => (
              <SelectItem key={week.value} value={week.value}>
                {week.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="border rounded-md">
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Employee</TableHead>
                {daysInWeek.map((day) => (
                  <TableHead key={day.toString()} className="min-w-[100px]">
                    <div className="text-center">
                      <div>{format(day, "EEE")}</div>
                      <div className="text-sm">{format(day, "MMM d")}</div>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-right min-w-[100px]">Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  {daysInWeek.map((day) => {
                    const dayShifts = getShiftsForDay(employee.id, day)
                    return (
                      <TableCell key={day.toString()} className="text-center">
                        {dayShifts.map((shift, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="mx-1"
                          >
                            {shift.shift}
                          </Badge>
                        ))}
                      </TableCell>
                    )
                  })}
                  <TableCell className="text-right font-medium">
                    {calculateWeeklyHours(employee.id)}h
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  )
}

export default StaffScheduleList 