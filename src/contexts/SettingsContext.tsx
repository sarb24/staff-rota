"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { ShiftType, ShiftRequirement, WeeklyRequirements, WorkingHours, DEFAULT_WORKING_HOURS } from "@/types/scheduling"

const DEFAULT_SHIFTS: ShiftRequirement[] = [
  { name: "morning", requiredStaff: 2, hours: 8.0 },
  { name: "day", requiredStaff: 3, hours: 8.0 },
  { name: "afternoon", requiredStaff: 2, hours: 8.0 },
  { name: "night", requiredStaff: 1, hours: 8.0 }
] as const

const DEFAULT_WEEKLY_REQUIREMENTS: WeeklyRequirements = {
  requiredShiftsPerWeek: 56,
  contractedHoursPerWeek: 37.0
}

interface SettingsContextType {
  shifts: ShiftRequirement[]
  weeklyRequirements: WeeklyRequirements
  workingHours: Record<string, WorkingHours>
  updateShifts: (shifts: ShiftRequirement[]) => void
  updateWeeklyRequirements: (requirements: WeeklyRequirements) => void
  updateWorkingHours: (hours: Record<string, WorkingHours>) => void
}

const SettingsContext = createContext<SettingsContextType>({
  shifts: DEFAULT_SHIFTS,
  weeklyRequirements: DEFAULT_WEEKLY_REQUIREMENTS,
  workingHours: DEFAULT_WORKING_HOURS,
  updateShifts: () => {},
  updateWeeklyRequirements: () => {},
  updateWorkingHours: () => {}
})

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [shifts, setShifts] = useState<ShiftRequirement[]>(DEFAULT_SHIFTS)
  const [weeklyRequirements, setWeeklyRequirements] = useState<WeeklyRequirements>(DEFAULT_WEEKLY_REQUIREMENTS)
  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHours>>(DEFAULT_WORKING_HOURS)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedShifts = localStorage.getItem("rota_shifts")
      const savedWeeklyRequirements = localStorage.getItem("rota_weekly_requirements")
      const savedWorkingHours = localStorage.getItem("rota_working_hours")

      if (savedShifts) {
        setShifts(JSON.parse(savedShifts))
      }
      if (savedWeeklyRequirements) {
        setWeeklyRequirements(JSON.parse(savedWeeklyRequirements))
      }
      if (savedWorkingHours) {
        setWorkingHours(JSON.parse(savedWorkingHours))
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem("rota_shifts", JSON.stringify(shifts))
      localStorage.setItem("rota_weekly_requirements", JSON.stringify(weeklyRequirements))
      localStorage.setItem("rota_working_hours", JSON.stringify(workingHours))
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }, [shifts, weeklyRequirements, workingHours, isInitialized])

  const updateShifts = (newShifts: ShiftRequirement[]) => {
    setShifts(newShifts)
  }

  const updateWeeklyRequirements = (newRequirements: WeeklyRequirements) => {
    setWeeklyRequirements(newRequirements)
  }

  const updateWorkingHours = (newHours: Record<string, WorkingHours>) => {
    setWorkingHours(newHours)
  }

  return (
    <SettingsContext.Provider
      value={{
        shifts,
        weeklyRequirements,
        workingHours,
        updateShifts,
        updateWeeklyRequirements,
        updateWorkingHours
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
} 