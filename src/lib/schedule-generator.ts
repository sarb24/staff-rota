import { addDays, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns"
import { ShiftRequirement } from "@/types/scheduling"

interface Staff {
  id: number
  name: string
  maxHoursPerWeek: number
  minHoursPerWeek: number
  availability: {
    [key: string]: string[] // day -> shifts available
  }
}

interface ScheduleEntry {
  employeeId: number
  date: Date
  shift: string
}

export function generateSchedule(
  staff: Staff[],
  shifts: ShiftRequirement[],
  startDate: Date,
  weeklyRequirements: {
    requiredShiftsPerWeek: number
    contractedHoursPerWeek: number
  }
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = []
  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(startDate, { weekStartsOn: 1 })
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Track assigned hours for each staff member
  const staffHours: { [key: number]: number } = {}
  staff.forEach(employee => {
    staffHours[employee.id] = 0
  })

  // For each day in the week
  daysInWeek.forEach(day => {
    const dayStr = format(day, 'EEEE').toLowerCase()

    // For each shift type
    shifts.forEach(shift => {
      const requiredStaff = shift.requiredStaff
      const shiftHours = shift.hours
      let assignedStaff = 0

      // Sort staff by hours assigned (ascending) to ensure fair distribution
      const availableStaff = staff
        .filter(employee => {
          const availability = employee.availability[dayStr] || []
          return availability.includes(shift.name) &&
                 staffHours[employee.id] + shiftHours <= employee.maxHoursPerWeek
        })
        .sort((a, b) => staffHours[a.id] - staffHours[b.id])

      // Assign staff to the shift
      for (const employee of availableStaff) {
        if (assignedStaff >= requiredStaff) break

        // Check if adding this shift would exceed weekly requirements
        if (staffHours[employee.id] + shiftHours <= employee.maxHoursPerWeek) {
          schedule.push({
            employeeId: employee.id,
            date: day,
            shift: shift.name
          })
          staffHours[employee.id] += shiftHours
          assignedStaff++
        }
      }
    })
  })

  return schedule
}

export function validateSchedule(
  schedule: ScheduleEntry[],
  staff: Staff[],
  shifts: ShiftRequirement[],
  weeklyRequirements: {
    requiredShiftsPerWeek: number
    contractedHoursPerWeek: number
  }
): {
  isValid: boolean
  issues: string[]
} {
  const issues: string[] = []
  const staffHours: { [key: number]: number } = {}
  const staffShiftsPerDay: { [key: string]: number } = {}

  // Initialize staff hours
  staff.forEach(employee => {
    staffHours[employee.id] = 0
  })

  // Check each schedule entry
  schedule.forEach(entry => {
    const shift = shifts.find(s => s.name === entry.shift)
    if (!shift) {
      issues.push(`Invalid shift type: ${entry.shift}`)
      return
    }

    // Track hours
    staffHours[entry.employeeId] = (staffHours[entry.employeeId] || 0) + shift.hours

    // Track shifts per day per employee
    const dayKey = `${entry.employeeId}-${format(entry.date, 'yyyy-MM-dd')}`
    staffShiftsPerDay[dayKey] = (staffShiftsPerDay[dayKey] || 0) + 1

    // Check if employee is working multiple shifts in a day
    if (staffShiftsPerDay[dayKey] > 1) {
      issues.push(`Employee ${entry.employeeId} is assigned multiple shifts on ${format(entry.date, 'yyyy-MM-dd')}`)
    }
  })

  // Check weekly hours for each employee
  staff.forEach(employee => {
    const hours = staffHours[employee.id] || 0
    if (hours < employee.minHoursPerWeek) {
      issues.push(`Employee ${employee.id} is under-scheduled (${hours} hours vs minimum ${employee.minHoursPerWeek})`)
    }
    if (hours > employee.maxHoursPerWeek) {
      issues.push(`Employee ${employee.id} is over-scheduled (${hours} hours vs maximum ${employee.maxHoursPerWeek})`)
    }
  })

  return {
    isValid: issues.length === 0,
    issues
  }
} 