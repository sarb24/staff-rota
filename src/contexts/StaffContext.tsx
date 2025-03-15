"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Employee, ScheduleEntry } from "@/types/scheduling"
import { toast } from "sonner"

interface StaffContextType {
  staff: Employee[]
  schedule: ScheduleEntry[]
  addStaff: (employee: Employee) => Promise<void>
  updateStaff: (employee: Employee) => Promise<void>
  deleteStaff: (id: number) => Promise<void>
  addScheduleEntry: (entry: ScheduleEntry) => Promise<void>
  updateScheduleEntry: (entry: ScheduleEntry) => Promise<void>
  deleteScheduleEntry: (entry: ScheduleEntry) => Promise<void>
  clearSchedule: () => Promise<void>
  hasScheduleConflict: (employeeId: number, date: Date) => boolean
}

const StaffContext = createContext<StaffContextType | undefined>(undefined)

const STORAGE_VERSION = '1.0'
const STORAGE_KEY_PREFIX = 'rota_app_'

function getStorageKey(key: string): string {
  return `${STORAGE_KEY_PREFIX}${key}_${STORAGE_VERSION}`
}

// Helper function to safely parse JSON with Date objects
function parseWithDates(jsonString: string) {
  return JSON.parse(jsonString, (key, value) => {
    if (key === 'date' && typeof value === 'string') {
      return new Date(value)
    }
    return value
  })
}

export function StaffProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [staff, setStaff] = useState<Employee[]>([])
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedStaff = localStorage.getItem(getStorageKey('staff'))
        const savedSchedule = localStorage.getItem(getStorageKey('schedule'))
        
        if (savedStaff) {
          const parsedStaff = parseWithDates(savedStaff)
          console.log('Loading staff:', parsedStaff)
          setStaff(parsedStaff)
        }
        
        if (savedSchedule) {
          const parsedSchedule = parseWithDates(savedSchedule)
          console.log('Loading schedule:', parsedSchedule)
          setSchedule(parsedSchedule)
        }
      } catch (error) {
        console.error('Error loading data:', error)
        setError('Failed to load saved data')
        toast.error('Error loading saved data')
      } finally {
        setIsInitialized(true)
      }
    }

    loadData()
  }, [])

  // Save staff data to localStorage
  useEffect(() => {
    if (!isInitialized) return

    try {
      console.log('Saving staff:', staff)
      localStorage.setItem(getStorageKey('staff'), JSON.stringify(staff))
    } catch (error) {
      console.error('Error saving staff:', error)
      toast.error('Error saving staff data')
    }
  }, [staff, isInitialized])

  // Save schedule data to localStorage
  useEffect(() => {
    if (!isInitialized) return

    try {
      console.log('Saving schedule:', schedule)
      localStorage.setItem(getStorageKey('schedule'), JSON.stringify(schedule))
    } catch (error) {
      console.error('Error saving schedule:', error)
      toast.error('Error saving schedule data')
    }
  }, [schedule, isInitialized])

  const hasScheduleConflict = (employeeId: number, date: Date) => {
    return schedule.some(entry => 
      entry.employeeId === employeeId && 
      entry.date.getTime() === date.getTime()
    )
  }

  const addStaff = async (employee: Employee) => {
    try {
      console.log('Adding staff member:', employee)
      setStaff(prev => [...prev, employee])
      toast.success('Staff member added successfully')
    } catch (error) {
      console.error('Error adding staff:', error)
      toast.error('Error adding staff member')
      throw error
    }
  }

  const updateStaff = async (employee: Employee) => {
    try {
      const hasSchedule = schedule.some(entry => entry.employeeId === employee.id)
      
      if (hasSchedule) {
        const confirmed = window.confirm(
          'This staff member has existing schedules. Updating their details might affect their schedules. Do you want to continue?'
        )
        if (!confirmed) {
          toast.dismiss()
          return
        }
      }

      console.log('Updating staff member:', employee)
      setStaff(prev => prev.map(s => s.id === employee.id ? employee : s))
      toast.success('Staff member updated successfully')
    } catch (error) {
      console.error('Error updating staff:', error)
      toast.error('Error updating staff member')
      throw error
    }
  }

  const deleteStaff = async (id: number) => {
    try {
      const hasSchedule = schedule.some(entry => entry.employeeId === id)
      
      if (hasSchedule) {
        const confirmed = window.confirm(
          'This staff member has existing schedules. Deleting them will also remove all their schedules. Do you want to continue?'
        )
        if (!confirmed) {
          toast.dismiss()
          return
        }
      }

      console.log('Deleting staff member:', id)
      setStaff(prev => prev.filter(s => s.id !== id))
      setSchedule(prev => prev.filter(s => s.employeeId !== id))
      toast.success('Staff member deleted successfully')
    } catch (error) {
      console.error('Error deleting staff:', error)
      toast.error('Error deleting staff member')
      throw error
    }
  }

  const addScheduleEntry = async (entry: ScheduleEntry) => {
    try {
      const newEntry = {
        ...entry,
        date: new Date(entry.date)
      }

      if (hasScheduleConflict(entry.employeeId, entry.date)) {
        const confirmed = window.confirm(
          'This staff member already has a shift on this date. Do you want to override it?'
        )
        if (!confirmed) {
          toast.dismiss()
          return
        }
        
        setSchedule(prev => prev.filter(s => 
          !(s.employeeId === entry.employeeId && s.date.getTime() === entry.date.getTime())
        ))
      }

      console.log('Adding schedule entry:', newEntry)
      setSchedule(prev => [...prev, newEntry])
      toast.success('Schedule entry added successfully')
    } catch (error) {
      console.error('Error adding schedule entry:', error)
      toast.error('Error adding schedule entry')
      throw error
    }
  }

  const updateScheduleEntry = async (entry: ScheduleEntry) => {
    try {
      const updatedEntry = {
        ...entry,
        date: new Date(entry.date)
      }
      
      console.log('Updating schedule entry:', updatedEntry)
      setSchedule(prev => prev.map(s => 
        s.employeeId === entry.employeeId && s.date.getTime() === updatedEntry.date.getTime() 
          ? updatedEntry 
          : s
      ))
      toast.success('Schedule entry updated successfully')
    } catch (error) {
      console.error('Error updating schedule entry:', error)
      toast.error('Error updating schedule entry')
      throw error
    }
  }

  const deleteScheduleEntry = async (entry: ScheduleEntry) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this schedule entry?'
      )
      if (!confirmed) {
        toast.dismiss()
        return
      }

      console.log('Deleting schedule entry:', entry)
      setSchedule(prev => prev.filter(s => 
        !(s.employeeId === entry.employeeId && s.date.getTime() === entry.date.getTime())
      ))
      toast.success('Schedule entry deleted successfully')
    } catch (error) {
      console.error('Error deleting schedule entry:', error)
      toast.error('Error deleting schedule entry')
      throw error
    }
  }

  const clearSchedule = async () => {
    try {
      setSchedule([])
      localStorage.setItem(getStorageKey('schedule'), JSON.stringify([]))
    } catch (error) {
      console.error('Error clearing schedule:', error)
      throw error
    }
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <StaffContext.Provider
      value={{
        staff,
        schedule,
        addStaff,
        updateStaff,
        deleteStaff,
        addScheduleEntry,
        updateScheduleEntry,
        deleteScheduleEntry,
        clearSchedule,
        hasScheduleConflict
      }}
    >
      {children}
    </StaffContext.Provider>
  )
}

export function useStaff() {
  const context = useContext(StaffContext)
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider')
  }
  return context
} 