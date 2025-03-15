"use client"

import React, { useState, useEffect } from "react"
import { useStaff } from "@/contexts/StaffContext"
import { Employee, ShiftType } from "@/types/scheduling"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { AlertCircle, Save, UserCircle, Plus, Trash2 } from "lucide-react"

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

const SHIFT_TYPES: ShiftType[] = ["morning", "afternoon", "night"]

const DEFAULT_EMPLOYEE: Employee = {
  id: 1,
  name: "",
  email: "",
  role: "staff",
  workingDays: [],
  shiftPreferences: ["morning"],
  contractedHours: 37.5,
  maxShiftsPerWeek: 5,
  minRestHoursBetweenShifts: 11,
  availability: {}
}

interface ValidationErrors {
  name?: string
  email?: string
  workingDays?: string
  shiftPreferences?: string
  contractedHours?: string
  maxShiftsPerWeek?: string
  minRestHoursBetweenShifts?: string
}

const StaffProfile: React.FC = () => {
  const { staff, addStaff, updateStaff } = useStaff()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(staff[0]?.id || DEFAULT_EMPLOYEE.id)
  const [profile, setProfile] = useState<Employee>(staff[0] || DEFAULT_EMPLOYEE)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const selectedEmployee = staff.find(emp => emp.id === selectedEmployeeId)
    if (selectedEmployee) {
      setProfile(selectedEmployee)
    }
  }, [selectedEmployeeId, staff])

  const validateProfile = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!profile.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Invalid email format"
    }

    if (profile.workingDays.length === 0) {
      newErrors.workingDays = "At least one working day must be selected"
    }

    if (profile.shiftPreferences.length === 0) {
      newErrors.shiftPreferences = "At least one shift preference must be selected"
    }

    if (profile.contractedHours <= 0 || profile.contractedHours > 48) {
      newErrors.contractedHours = "Contracted hours must be between 1 and 48"
    }

    if (profile.maxShiftsPerWeek <= 0 || profile.maxShiftsPerWeek > 7) {
      newErrors.maxShiftsPerWeek = "Maximum shifts per week must be between 1 and 7"
    }

    if (profile.minRestHoursBetweenShifts < 11) {
      newErrors.minRestHoursBetweenShifts = "Minimum rest hours must be at least 11"
    }

    // Check for maximum consecutive working days
    const sortedDays = profile.workingDays.sort((a, b) => 
      DAYS_OF_WEEK.indexOf(a) - DAYS_OF_WEEK.indexOf(b)
    )
    let consecutiveDays = 1
    for (let i = 1; i < sortedDays.length; i++) {
      if (DAYS_OF_WEEK.indexOf(sortedDays[i]) - DAYS_OF_WEEK.indexOf(sortedDays[i-1]) === 1) {
        consecutiveDays++
      } else {
        consecutiveDays = 1
      }
      if (consecutiveDays > 5) {
        newErrors.workingDays = "Maximum 5 consecutive working days allowed"
        break
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof Employee, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDayToggle = (day: string) => {
    setProfile(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }))
  }

  const handleShiftToggle = (shift: ShiftType) => {
    setProfile(prev => {
      const newPreferences = prev.shiftPreferences.includes(shift)
        ? prev.shiftPreferences.filter(s => s !== shift)
        : [...prev.shiftPreferences, shift]
      return { ...prev, shiftPreferences: newPreferences }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profile.name || !profile.email) {
      toast.error("Please fill in all required fields")
      return
    }

    if (staff.find(emp => emp.id === profile.id)) {
      updateStaff(profile)
      toast.success("Staff profile updated successfully")
    } else {
      addStaff({
        ...profile,
        id: Math.max(0, ...staff.map(emp => emp.id)) + 1
      })
      toast.success("Staff profile created successfully")
    }
  }

  const handleEmployeeSelect = (employeeId: number) => {
    const selectedEmployee = staff.find(emp => emp.id === employeeId)
    if (selectedEmployee) {
      setSelectedEmployeeId(employeeId)
      setProfile(selectedEmployee)
      setErrors({})
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    const currentEmployee = staff.find(emp => emp.id === selectedEmployeeId)
    if (currentEmployee) {
      setProfile(currentEmployee)
    }
    setErrors({})
    setIsEditing(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedEmployeeId.toString()} onValueChange={(value) => handleEmployeeSelect(Number(value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            {staff.map(emp => (
              <SelectItem key={emp.id} value={emp.id.toString()}>
                {emp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Staff Profile
          </CardTitle>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name
                {errors.name && (
                  <span className="text-red-500 ml-2 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {errors.name}
                  </span>
                )}
              </Label>
              <Input 
                id="name" 
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                className={errors.name ? "border-red-500" : ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
                {errors.email && (
                  <span className="text-red-500 ml-2 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {errors.email}
                  </span>
                )}
              </Label>
              <Input 
                id="email" 
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className={errors.email ? "border-red-500" : ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                Working Days
                {errors.workingDays && (
                  <span className="text-red-500 ml-2 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {errors.workingDays}
                  </span>
                )}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={profile.workingDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                      disabled={!isEditing}
                    />
                    <label
                      htmlFor={day}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Shift Preferences
                {errors.shiftPreferences && (
                  <span className="text-red-500 ml-2 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {errors.shiftPreferences}
                  </span>
                )}
              </Label>
              <div className="grid grid-cols-4 gap-4">
                {SHIFT_TYPES.map(shift => (
                  <div key={shift} className="flex items-center space-x-2">
                    <Checkbox
                      id={`shift-${shift}`}
                      checked={profile.shiftPreferences.includes(shift)}
                      onCheckedChange={() => handleShiftToggle(shift)}
                      disabled={!isEditing}
                    />
                    <Label htmlFor={`shift-${shift}`} className="capitalize">
                      {shift}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractedHours">
                  Contracted Hours/Week
                  {errors.contractedHours && (
                    <span className="text-red-500 ml-2 text-sm">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      {errors.contractedHours}
                    </span>
                  )}
                </Label>
                <Input
                  id="contractedHours"
                  type="number"
                  min="1"
                  max="48"
                  value={profile.contractedHours}
                  onChange={(e) => handleInputChange("contractedHours", parseFloat(e.target.value))}
                  disabled={!isEditing}
                  className={errors.contractedHours ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxShiftsPerWeek">
                  Max Shifts/Week
                  {errors.maxShiftsPerWeek && (
                    <span className="text-red-500 ml-2 text-sm">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      {errors.maxShiftsPerWeek}
                    </span>
                  )}
                </Label>
                <Input
                  id="maxShiftsPerWeek"
                  type="number"
                  min="1"
                  max="7"
                  value={profile.maxShiftsPerWeek}
                  onChange={(e) => handleInputChange("maxShiftsPerWeek", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={errors.maxShiftsPerWeek ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minRestHoursBetweenShifts">
                  Min Rest Hours
                  {errors.minRestHoursBetweenShifts && (
                    <span className="text-red-500 ml-2 text-sm">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      {errors.minRestHoursBetweenShifts}
                    </span>
                  )}
                </Label>
                <Input
                  id="minRestHoursBetweenShifts"
                  type="number"
                  min="11"
                  value={profile.minRestHoursBetweenShifts}
                  onChange={(e) => handleInputChange("minRestHoursBetweenShifts", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={errors.minRestHoursBetweenShifts ? "border-red-500" : ""}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button 
                  type="submit"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffProfile 