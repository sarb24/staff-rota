export type ShiftType = "morning" | "day" | "afternoon" | "night"
export type LeaveType = "Annual" | "Sick" | "Other"
export type ViewType = "Weekly" | "Monthly"
export type ShiftStatus = "Scheduled" | "InProgress" | "Completed" | "Cancelled"
export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

export interface Employee {
  id: number
  name: string
  role: string
  email: string
  phone?: string
  notes?: string
  workingDays: string[]
  shiftPreferences: ShiftType[]
  contractedHours: number
  maxShiftsPerWeek: number
  minRestHoursBetweenShifts: number
  availability: {
    [key: string]: ShiftType[] // day -> available shifts
  }
}

export interface Shift {
  type: ShiftType
  startTime: string
  endTime: string
  breakTime?: string
  breakDuration?: number  // in minutes
  defaultDuration: number // in minutes
  color?: string  // for UI display
  requiredStaff: number  // number of staff required for this shift
}

export const DEFAULT_SHIFTS: Record<ShiftType, Shift> = {
  morning: {
    type: "morning",
    startTime: "06:00",
    endTime: "14:00",
    defaultDuration: 480,  // 8 hours
    breakTime: "10:00",
    breakDuration: 30,
    color: "blue",
    requiredStaff: 2
  },
  day: {
    type: "day",
    startTime: "09:00",
    endTime: "17:00",
    defaultDuration: 480,  // 8 hours
    breakTime: "13:00",
    breakDuration: 30,
    color: "yellow",
    requiredStaff: 3
  },
  afternoon: {
    type: "afternoon",
    startTime: "14:00",
    endTime: "22:00",
    defaultDuration: 480,
    breakTime: "18:00",
    breakDuration: 30,
    color: "green",
    requiredStaff: 2
  },
  night: {
    type: "night",
    startTime: "22:00",
    endTime: "06:00",
    defaultDuration: 480,
    breakTime: "02:00",
    breakDuration: 30,
    color: "red",
    requiredStaff: 1
  }
}

export interface ScheduleEntry {
  employeeId: number
  date: Date
  shift: ShiftType
}

export interface LeaveRequest {
  employeeId: number
  startDate: Date
  endDate: Date
  type: LeaveType
  status: "Pending" | "Approved" | "Rejected"
  reason?: string
  approvedBy?: number
  notes?: string
}

export interface SchedulingRules {
  maxConsecutiveDays: number
  minRestHoursBetweenShifts: number
  maxHoursPerWeek: number
  maxShiftsPerWeek: number
  maxShiftsPerDay: number
  minHoursPerShift: number
  preferredShiftRotation: boolean
}

export const DEFAULT_SCHEDULING_RULES: SchedulingRules = {
  maxConsecutiveDays: 5,
  minRestHoursBetweenShifts: 11,
  maxHoursPerWeek: 48,
  maxShiftsPerWeek: 5,
  maxShiftsPerDay: 3,
  minHoursPerShift: 4,
  preferredShiftRotation: true
}

export interface DailySchedule {
  date: Date
  totalHours: number
  totalShifts: number
  shifts: ScheduleEntry[]
}

export interface WeeklySchedule {
  startDate: Date
  endDate: Date
  totalHours: number
  totalShifts: number
  dailySchedules: DailySchedule[]
  staffHours: Record<number, number> // employeeId -> hours worked
}

export interface MonthlySchedule {
  month: number
  year: number
  totalHours: number
  totalShifts: number
  weeklySchedules: WeeklySchedule[]
  staffHours: Record<number, number> // employeeId -> hours worked
}

export interface ScheduleStats {
  totalHoursScheduled: number
  totalShiftsScheduled: number
  averageHoursPerWeek: number
  averageShiftsPerWeek: number
  staffUtilization: Record<number, {
    hoursScheduled: number
    shiftsScheduled: number
    utilizationPercentage: number
  }>
}

export interface WorkingHours {
  startTime: string
  endTime: string
}

export type WorkingHoursConfig = Record<DayOfWeek, WorkingHours>

export const DEFAULT_WORKING_HOURS: WorkingHoursConfig = {
  Monday: { startTime: "09:00", endTime: "17:00" },
  Tuesday: { startTime: "09:00", endTime: "17:00" },
  Wednesday: { startTime: "09:00", endTime: "17:00" },
  Thursday: { startTime: "09:00", endTime: "17:00" },
  Friday: { startTime: "09:00", endTime: "17:00" },
  Saturday: { startTime: "09:00", endTime: "17:00" },
  Sunday: { startTime: "09:00", endTime: "17:00" }
}

export interface ShiftRequirement {
  name: ShiftType
  requiredStaff: number
  hours: number
}

export interface WeeklyRequirements {
  requiredShiftsPerWeek: number
  contractedHoursPerWeek: number
}

export interface Staff {
  id: number
  name: string
  maxHoursPerWeek: number
  minHoursPerWeek: number
  availability: {
    [key: string]: string[] // day -> shifts available
  }
}