"use client"

import { useStaff } from "@/contexts/StaffContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ScheduleEntry, ShiftType } from "@/types/scheduling"

export default function ScheduleView() {
  const { staff, schedule } = useStaff()

  // Group schedule entries by date
  const scheduleByDate = schedule?.reduce((acc: Record<string, ScheduleEntry[]>, entry) => {
    const dateStr = format(entry.date, 'yyyy-MM-dd')
    if (!acc[dateStr]) {
      acc[dateStr] = []
    }
    acc[dateStr].push(entry)
    return acc
  }, {}) || {}

  const getShiftBadgeColor = (shift: ShiftType) => {
    switch (shift) {
      case "morning":
        return "bg-blue-500"
      case "day":
        return "bg-yellow-500"
      case "afternoon":
        return "bg-purple-500"
      case "night":
        return "bg-indigo-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!schedule || schedule.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No schedule entries found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Staff Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Name</h3>
          <p className="text-sm text-gray-600">John Doe</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Email</h3>
          <p className="text-sm text-gray-600">john@example.com</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Working Days</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="monday" className="rounded" />
              <label htmlFor="monday">Monday</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="tuesday" className="rounded" />
              <label htmlFor="tuesday">Tuesday</label>
            </div>
            {/* Add other days similarly */}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Shift Preference</h3>
          <select className="w-full rounded-md border p-2">
            <option>Day</option>
            <option>Night</option>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Staff Member</TableHead>
            <TableHead>Shift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(scheduleByDate).map(([dateStr, entries]) => (
            entries.map((entry, index) => {
              const employee = staff.find(s => s.id === entry.employeeId)
              return (
                <TableRow key={`${dateStr}-${index}`}>
                  <TableCell>{format(entry.date, 'dd MMM yyyy')}</TableCell>
                  <TableCell>{employee?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getShiftBadgeColor(entry.shift)}
                    >
                      {entry.shift}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 