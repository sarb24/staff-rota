"use client"

import { useStaff } from "@/contexts/StaffContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEFAULT_SHIFTS, DEFAULT_SCHEDULING_RULES, ScheduleStats } from "@/types/scheduling"
import { Progress } from "@/components/ui/progress"

export function ScheduleStatistics() {
  const { staff, schedule } = useStaff()

  const calculateStats = (): ScheduleStats => {
    const stats: ScheduleStats = {
      totalHoursScheduled: 0,
      totalShiftsScheduled: 0,
      averageHoursPerWeek: 0,
      averageShiftsPerWeek: 0,
      staffUtilization: {}
    }

    // Initialize staff utilization
    staff.forEach(employee => {
      stats.staffUtilization[employee.id] = {
        hoursScheduled: 0,
        shiftsScheduled: 0,
        utilizationPercentage: 0
      }
    })

    // Calculate total hours and shifts
    schedule.forEach(entry => {
      const shift = DEFAULT_SHIFTS[entry.shift]
      const hours = shift.defaultDuration / 60 // Convert minutes to hours

      stats.totalHoursScheduled += hours
      stats.totalShiftsScheduled++

      if (stats.staffUtilization[entry.employeeId]) {
        stats.staffUtilization[entry.employeeId].hoursScheduled += hours
        stats.staffUtilization[entry.employeeId].shiftsScheduled++
      }
    })

    // Calculate utilization percentages
    staff.forEach(employee => {
      const utilization = stats.staffUtilization[employee.id]
      if (utilization) {
        const weeklyHoursTarget = employee.contractedHours
        const totalWeeks = Math.ceil(schedule.length / (employee.maxShiftsPerWeek || DEFAULT_SCHEDULING_RULES.maxShiftsPerWeek))
        const targetHours = weeklyHoursTarget * totalWeeks
        utilization.utilizationPercentage = targetHours > 0 ? (utilization.hoursScheduled / targetHours) * 100 : 0
      }
    })

    // Calculate averages
    const totalWeeks = Math.ceil(schedule.length / DEFAULT_SCHEDULING_RULES.maxShiftsPerWeek)
    stats.averageHoursPerWeek = totalWeeks > 0 ? stats.totalHoursScheduled / totalWeeks : 0
    stats.averageShiftsPerWeek = totalWeeks > 0 ? stats.totalShiftsScheduled / totalWeeks : 0

    return stats
  }

  const stats = calculateStats()

  // Calculate total contracted hours per week
  const totalContractedHours = staff.reduce((sum, employee) => sum + employee.contractedHours, 0)

  // Calculate required staff per shift
  const requiredStaffPerShift = Object.values(DEFAULT_SHIFTS).reduce((acc, shift) => {
    acc[shift.type] = shift.requiredStaff
    return acc
  }, {} as Record<string, number>)

  // Calculate required shifts per week
  const requiredShiftsPerWeek = Object.values(DEFAULT_SHIFTS).reduce((sum, shift) => sum + shift.requiredStaff, 0) * 7

  // Calculate required hours per week
  const requiredHoursPerWeek = Object.values(DEFAULT_SHIFTS).reduce((sum, shift) => 
    sum + (shift.requiredStaff * (shift.defaultDuration / 60)), 0) * 7

  // Calculate working hours per shift type
  const workingHoursPerShift = Object.values(DEFAULT_SHIFTS).reduce((acc, shift) => {
    acc[shift.type] = shift.defaultDuration / 60 // Convert minutes to hours
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Total Hours Scheduled</h3>
              <p className="text-2xl font-bold">{stats.totalHoursScheduled.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Total Shifts Scheduled</h3>
              <p className="text-2xl font-bold">{stats.totalShiftsScheduled}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Average Hours/Week</h3>
              <p className="text-2xl font-bold">{stats.averageHoursPerWeek.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Average Shifts/Week</h3>
              <p className="text-2xl font-bold">{stats.averageShiftsPerWeek.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Required Staff per Shift</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(requiredStaffPerShift).map(([shift, required]) => (
                <div key={shift} className="flex justify-between items-center">
                  <span className="capitalize">{shift}</span>
                  <span className="font-medium">{required} staff</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Working Hours per Shift</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(workingHoursPerShift).map(([shift, hours]) => (
                <div key={shift} className="flex justify-between items-center">
                  <span className="capitalize">{shift}</span>
                  <span className="font-medium">{hours.toFixed(1)} hours</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Weekly Requirements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Required Shifts/Week</span>
                <p className="text-xl font-bold">{requiredShiftsPerWeek}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Required Hours/Week</span>
                <p className="text-xl font-bold">{requiredHoursPerWeek.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Total Contracted Hours/Week</h3>
            <p className="text-2xl font-bold">{totalContractedHours.toFixed(1)} hours</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Utilization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {staff.map(employee => {
            const utilization = stats.staffUtilization[employee.id]
            if (!utilization) return null

            return (
              <div key={employee.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{employee.name}</span>
                  <span className="text-sm text-gray-500">
                    {utilization.hoursScheduled.toFixed(1)} hrs / {employee.contractedHours} hrs
                  </span>
                </div>
                <Progress value={utilization.utilizationPercentage} />
                <div className="text-sm text-gray-500">
                  {utilization.shiftsScheduled} shifts ({utilization.utilizationPercentage.toFixed(1)}% utilization)
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Max Hours/Week</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.maxHoursPerWeek}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Max Shifts/Week</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.maxShiftsPerWeek}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Max Shifts/Day</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.maxShiftsPerDay}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Min Rest Hours</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.minRestHoursBetweenShifts}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Max Consecutive Days</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.maxConsecutiveDays}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Min Hours/Shift</h3>
              <p className="text-xl">{DEFAULT_SCHEDULING_RULES.minHoursPerShift}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 