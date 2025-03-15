"use client"

import React, { useState, useEffect } from "react"
import { useStaff } from "@/contexts/StaffContext"
import { Employee, ShiftType, ViewType, ScheduleEntry } from "@/types/scheduling"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, RotateCcw, FileBarChart, Settings, Wand2, ArrowLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, startOfWeek, startOfMonth, addDays, eachDayOfInterval, endOfWeek, endOfMonth, isSameMonth } from "date-fns"
import { toast } from "sonner"
import { useSettings } from "@/contexts/SettingsContext"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { generateSchedule, validateSchedule } from "@/lib/schedule-generator"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShiftStats {
  [key: number]: {
    total: number
    byType: Record<ShiftType, number>
    totalHours: number
  }
}

const StaffSchedulingCalendar: React.FC = () => {
  const router = useRouter()
  const { 
    staff, 
    schedule, 
    addScheduleEntry, 
    updateScheduleEntry, 
    deleteScheduleEntry,
    clearSchedule
  } = useStaff()
  const { shifts, weeklyRequirements } = useSettings()
  const [date, setDate] = useState<Date>(new Date())
  const [viewType, setViewType] = useState<ViewType>("Weekly")
  const [showStats, setShowStats] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Convert shifts array to required format
  const staffPerShift = shifts.reduce((acc, shift) => {
    acc[shift.name] = shift.requiredStaff
    return acc
  }, {} as Record<string, number>)

  const hoursPerShift = shifts.reduce((acc, shift) => {
    acc[shift.name] = shift.hours
    return acc
  }, {} as Record<string, number>)

  const schedulingRules = {
    maxHoursPerWeek: weeklyRequirements.contractedHoursPerWeek,
    maxShiftsPerWeek: weeklyRequirements.requiredShiftsPerWeek,
    maxShiftsPerDay: 1,
    minRestHours: 11,
    maxConsecutiveDays: 5,
    minHoursPerShift: 4
  }

  // Calculate weekly required hours based on shifts
  const weeklyRequiredHours = shifts.reduce((total, shift) => 
    total + (shift.requiredStaff * shift.hours * 7), 0
  )

  // Calculate daily required hours
  const dailyRequiredHours = shifts.reduce((total, shift) => 
    total + (shift.requiredStaff * shift.hours), 0
  )

  // Calculate daily required shifts
  const dailyRequiredShifts = shifts.reduce((total, shift) => 
    total + shift.requiredStaff, 0
  )

  // Calculate weekly required shifts
  const weeklyRequiredShifts = dailyRequiredShifts * 7

  // Add debugging logs
  useEffect(() => {
    console.log('Staff:', staff)
    console.log('Schedule:', schedule)
    console.log('Current date:', date)
    console.log('Days in view:', getDaysInView())
    console.log('Staff per shift:', staffPerShift)
    console.log('Hours per shift:', hoursPerShift)
    
    // Debug localStorage
    const savedStaff = localStorage.getItem('staff')
    const savedSchedule = localStorage.getItem('schedule')
    console.log('localStorage staff:', savedStaff ? JSON.parse(savedStaff) : null)
    console.log('localStorage schedule:', savedSchedule ? JSON.parse(savedSchedule) : null)
  }, [staff, schedule, date])

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
    }
  }

  const handleViewChange = (value: string) => {
    setViewType(value as ViewType)
  }

  const getDaysInView = () => {
    if (viewType === "Weekly") {
      const start = startOfWeek(date, { weekStartsOn: 1 })
      return eachDayOfInterval({
        start,
        end: endOfWeek(date, { weekStartsOn: 1 }),
      })
    } else {
      const start = startOfMonth(date)
      return eachDayOfInterval({
        start,
        end: endOfMonth(date),
      })
    }
  }

  const calculateShiftStats = () => {
    const stats: ShiftStats = {}
    
    staff.forEach((emp: Employee) => {
      stats[emp.id] = {
        total: 0,
        totalHours: 0,
        byType: {
          morning: 0,
          day: 0,
          afternoon: 0,
          night: 0
        }
      }
    })

    schedule.forEach(entry => {
      if (entry.shift && stats[entry.employeeId]) {
        const shift = shifts.find(s => s.name === entry.shift)
        if (shift) {
          stats[entry.employeeId].total++
          stats[entry.employeeId].byType[entry.shift]++
          stats[entry.employeeId].totalHours += shift.hours
        }
      }
    })

    return stats
  }

  const handleGenerateSchedule = async () => {
    setIsGenerating(true)
    try {
      // Clear existing schedule for the week
      const weekStart = startOfWeek(date, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
      
      // Clear existing entries
      await clearSchedule()

      // Generate new schedule with contracted hours consideration
      const newSchedule = generateSchedule(
        staff.map(s => ({
          id: s.id,
          name: s.name,
          maxHoursPerWeek: s.contractedHours, // Use individual contracted hours
          minHoursPerWeek: Math.floor(s.contractedHours * 0.8), // 80% of contracted hours
          availability: s.workingDays.reduce((acc, day) => ({
            ...acc,
            [day.toLowerCase()]: s.shiftPreferences
          }), {} as Record<string, ShiftType[]>)
        })),
        shifts.map(s => ({
          ...s,
          name: s.name as ShiftType
        })),
        date,
        weeklyRequirements
      )

      // Validate the generated schedule
      const validation = validateSchedule(newSchedule, staff.map(s => ({
        id: s.id,
        name: s.name,
        maxHoursPerWeek: s.contractedHours,
        minHoursPerWeek: Math.floor(s.contractedHours * 0.8),
        availability: s.workingDays.reduce((acc, day) => ({
          ...acc,
          [day.toLowerCase()]: s.shiftPreferences
        }), {} as Record<string, ShiftType[]>)
      })), shifts, weeklyRequirements)

      if (!validation.isValid) {
        console.warn("Schedule validation issues:", validation.issues)
        toast.warning("Schedule generated with some issues", {
          description: "Some constraints could not be satisfied. Check the console for details."
        })
      }

      // Add new schedule entries
      for (const entry of newSchedule) {
        await addScheduleEntry({
          ...entry,
          shift: entry.shift as ShiftType
        })
      }

      toast.success("Schedule generated successfully!")
    } catch (error) {
      console.error("Error generating schedule:", error)
      toast.error("Failed to generate schedule")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShiftClick = async (employeeId: number, date: Date, shift: ShiftType) => {
    try {
      await addScheduleEntry({
        employeeId,
        date: new Date(date),
        shift
      })
      toast.success("Shift assigned successfully")
    } catch (error) {
      console.error("Error assigning shift:", error)
      toast.error("Failed to assign shift")
    }
  }

  const isShiftTaken = (date: Date, shift: string) => {
    return schedule.some(entry => 
      entry.date.getTime() === date.getTime() &&
      entry.shift === shift
    )
  }

  const getEmployeeShift = (employeeId: number, date: Date) => {
    return schedule.find(
      entry => entry.employeeId === employeeId && 
      entry.date.getTime() === date.getTime()
    )?.shift
  }

  // Enhanced staff hours status calculation
  const calculateStaffHoursStatus = (employeeId: number) => {
    const stats = calculateShiftStats()[employeeId]
    const employee = staff.find(emp => emp.id === employeeId)
    if (!employee) return null

    const totalHours = stats?.totalHours || 0
    const contractedHours = employee.contractedHours
    const percentage = (totalHours / contractedHours) * 100
    const hoursRemaining = contractedHours - totalHours

    return {
      totalHours,
      contractedHours,
      percentage,
      hoursRemaining,
      isUnderContracted: totalHours < contractedHours,
      isOverContracted: totalHours > contractedHours,
      warningThreshold: contractedHours * 0.8 // 80% threshold
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Weekly">Weekly View</SelectItem>
              <SelectItem value="Monthly">Monthly View</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none h-10 w-10 p-0"
              onClick={() => setShowStats(!showStats)}
            >
              <FileBarChart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none h-10 w-10 p-0"
              onClick={() => router.push("/settings/requirements")}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          onClick={handleGenerateSchedule}
          disabled={isGenerating}
          className="w-full sm:w-auto"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Schedule"}
        </Button>
      </div>

      <Card>
        <ScrollArea className="border rounded-md">
          <div className="p-2 sm:p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px] sm:min-w-[150px] sticky left-0 bg-background z-10">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-base">Employee</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-0.5 sm:gap-1">
                              (Hours) <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Shows current/contracted hours and completion percentage</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  {getDaysInView().map((day) => (
                    <TableHead key={day.toString()} className="min-w-[60px] sm:min-w-[100px]">
                      <div className="text-center">
                        <div className="text-xs sm:text-base">{format(day, "EEE")}</div>
                        <div className={`text-[10px] sm:text-sm ${!isSameMonth(day, date) ? "text-muted-foreground" : ""}`}>
                          {format(day, "d")}
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((employee) => {
                  const hoursStatus = calculateStaffHoursStatus(employee.id)
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">
                        <div className="flex flex-col gap-0.5 sm:gap-1">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-base truncate">{employee.name}</span>
                            {hoursStatus && hoursStatus.isUnderContracted && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Needs {hoursStatus.hoursRemaining.toFixed(1)} more hours to meet contracted hours</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          {hoursStatus && (
                            <div className="flex flex-col gap-0.5">
                              <div className={cn(
                                "text-[10px] sm:text-xs",
                                {
                                  "text-red-500": hoursStatus.isUnderContracted && hoursStatus.percentage < hoursStatus.warningThreshold,
                                  "text-yellow-500": hoursStatus.isUnderContracted && hoursStatus.percentage >= hoursStatus.warningThreshold,
                                  "text-green-500": !hoursStatus.isUnderContracted
                                }
                              )}>
                                {hoursStatus.totalHours.toFixed(1)} / {hoursStatus.contractedHours} hrs
                              </div>
                              <div className="w-full bg-secondary h-1 sm:h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    {
                                      "bg-red-500": hoursStatus.percentage < hoursStatus.warningThreshold,
                                      "bg-yellow-500": hoursStatus.percentage >= hoursStatus.warningThreshold && hoursStatus.percentage < 100,
                                      "bg-green-500": hoursStatus.percentage >= 100
                                    }
                                  )}
                                  style={{ width: `${Math.min(hoursStatus.percentage, 100)}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      {getDaysInView().map((day) => {
                        const entry = schedule.find(
                          (e) =>
                            e.employeeId === employee.id &&
                            e.date.getTime() === day.getTime()
                        )
                        return (
                          <TableCell key={day.toString()} className="p-0.5 sm:p-2">
                            <Popover>
                              <PopoverTrigger className="h-full w-full p-0.5 sm:p-2">
                                {entry ? (
                                  <Badge
                                    variant="outline"
                                    className="w-full justify-center text-[10px] sm:text-sm"
                                  >
                                    {entry.shift}
                                  </Badge>
                                ) : (
                                  <div className="h-4 sm:h-6" />
                                )}
                              </PopoverTrigger>
                              <PopoverContent className="w-40 p-0">
                                <div className="grid grid-cols-1 gap-1 p-1">
                                  {shifts.map((shift) => (
                                    <Button
                                      key={shift.name}
                                      variant="ghost"
                                      className="justify-start text-sm"
                                      onClick={() => handleShiftClick(employee.id, day, shift.name as ShiftType)}
                                    >
                                      <Clock className="mr-2 h-4 w-4" />
                                      {shift.name}
                                    </Button>
                                  ))}
                                  {entry && (
                                    <Button
                                      variant="ghost"
                                      className="justify-start text-destructive text-sm"
                                      onClick={() => deleteScheduleEntry({
                                        employeeId: entry.employeeId,
                                        date: entry.date,
                                        shift: entry.shift
                                      })}
                                    >
                                      <RotateCcw className="mr-2 h-4 w-4" />
                                      Clear
                                    </Button>
                                  )}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
                <TableRow className="font-medium bg-muted/50">
                  <TableCell className="sticky left-0 bg-muted/50 z-10 text-xs sm:text-base">Daily Totals</TableCell>
                  {getDaysInView().map((day) => {
                    const dayEntries = schedule.filter(
                      entry => entry.date.getTime() === day.getTime()
                    )
                    const totalShifts = dayEntries.length
                    const totalHours = dayEntries.reduce((sum, entry) => {
                      const shift = shifts.find(s => s.name === entry.shift)
                      return sum + (shift?.hours || 0)
                    }, 0)

                    return (
                      <TableCell key={day.toString()} className="p-0.5 sm:p-2">
                        <div className="text-center space-y-0.5 sm:space-y-1">
                          <div className={cn(
                            "text-[10px] sm:text-sm",
                            {
                              "text-red-500": totalShifts < dailyRequiredShifts,
                              "text-green-500": totalShifts >= dailyRequiredShifts
                            }
                          )}>
                            {totalShifts} / {dailyRequiredShifts} shifts
                          </div>
                          <div className={cn(
                            "text-[10px] sm:text-sm",
                            {
                              "text-red-500": totalHours < dailyRequiredHours,
                              "text-green-500": totalHours >= dailyRequiredHours
                            }
                          )}>
                            {totalHours.toFixed(1)} / {dailyRequiredHours.toFixed(1)} hrs
                          </div>
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </Card>

      <Card>
        <CardContent className="pt-3 sm:pt-6">
          <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-4">
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="font-medium text-xs sm:text-base flex items-center gap-1 sm:gap-2">
                Staff Hours
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shows how many staff members are meeting their contracted hours</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <div className="space-y-0.5 sm:space-y-1">
                {staff.map(employee => {
                  const status = calculateStaffHoursStatus(employee.id)
                  if (!status) return null
                  return (
                    <div key={employee.id} className="flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="truncate">{employee.name}</span>
                      <span className={cn({
                        "text-red-500": status.percentage < status.warningThreshold,
                        "text-yellow-500": status.percentage >= status.warningThreshold && status.percentage < 100,
                        "text-green-500": status.percentage >= 100
                      })}>
                        {status.percentage.toFixed(0)}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="font-medium text-xs sm:text-base">Total Shifts</h3>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-lg sm:text-2xl font-bold">
                  {Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0)}
                </div>
                <div className="text-[10px] sm:text-sm text-muted-foreground">
                  / {weeklyRequiredShifts}
                </div>
              </div>
              <div className={cn(
                "text-[10px] sm:text-sm font-medium",
                {
                  "text-red-500": Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) < weeklyRequiredShifts,
                  "text-green-500": Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) >= weeklyRequiredShifts
                }
              )}>
                {Math.abs(weeklyRequiredShifts - Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0))} shifts {
                  Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) < weeklyRequiredShifts ? 'uncovered' : 'extra'
                }
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="font-medium text-xs sm:text-base">Total Hours</h3>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-lg sm:text-2xl font-bold">
                  {Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0).toFixed(1)}
                </div>
                <div className="text-[10px] sm:text-sm text-muted-foreground">
                  / {weeklyRequiredHours.toFixed(1)}
                </div>
              </div>
              <div className={cn(
                "text-[10px] sm:text-sm font-medium",
                {
                  "text-red-500": Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) < weeklyRequiredHours,
                  "text-green-500": Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) >= weeklyRequiredHours
                }
              )}>
                {Math.abs(weeklyRequiredHours - Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0)).toFixed(1)} hours {
                  Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) < weeklyRequiredHours ? 'uncovered' : 'extra'
                }
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="font-medium text-xs sm:text-base">Staff Coverage</h3>
              <div className={cn(
                "text-lg sm:text-2xl font-bold",
                {
                  "text-red-500": (Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) / weeklyRequiredShifts) * 100 < 100,
                  "text-green-500": (Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) / weeklyRequiredShifts) * 100 >= 100
                }
              )}>
                {((Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.total, 0) / weeklyRequiredShifts) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="font-medium text-xs sm:text-base">Hours Coverage</h3>
              <div className={cn(
                "text-lg sm:text-2xl font-bold",
                {
                  "text-red-500": (Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) / weeklyRequiredHours) * 100 < 100,
                  "text-green-500": (Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) / weeklyRequiredHours) * 100 >= 100
                }
              )}>
                {((Object.values(calculateShiftStats()).reduce((sum, stat) => sum + stat.totalHours, 0) / weeklyRequiredHours) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffSchedulingCalendar 