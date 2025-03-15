"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as Select from "@radix-ui/react-select"
import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react"
import { useStaff } from "@/contexts/StaffContext"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { ShiftType } from "@/types/scheduling"
import { toast } from "sonner"

const roles = [
  { id: "manager", name: "Manager" },
  { id: "supervisor", name: "Supervisor" },
  { id: "staff", name: "Staff Member" }
] as const

type Role = typeof roles[number]['id']

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

export default function AddStaffPage() {
  const router = useRouter()
  const { addStaff } = useStaff()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "" as Role,
    phone: "",
    workingDays: [] as string[],
    shiftPreferences: [] as ShiftType[],
    contractedHours: 37.5,
    maxShiftsPerWeek: 5,
    minRestHoursBetweenShifts: 11
  })
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'contractedHours' || name === 'maxShiftsPerWeek' || name === 'minRestHoursBetweenShifts'
        ? Number(value)
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form data
    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (formData.workingDays.length === 0) {
      toast.error('Please select at least one working day')
      setLoading(false)
      return
    }

    if (formData.shiftPreferences.length === 0) {
      toast.error('Please select at least one shift preference')
      setLoading(false)
      return
    }

    if (formData.contractedHours <= 0 || formData.contractedHours > 168) {
      toast.error('Contracted hours must be between 0 and 168')
      setLoading(false)
      return
    }

    if (formData.maxShiftsPerWeek < 1 || formData.maxShiftsPerWeek > 7) {
      toast.error('Maximum shifts per week must be between 1 and 7')
      setLoading(false)
      return
    }

    if (formData.minRestHoursBetweenShifts < 11) {
      toast.error('Minimum rest hours between shifts must be at least 11 hours')
      setLoading(false)
      return
    }

    try {
      await addStaff({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        workingDays: formData.workingDays,
        shiftPreferences: formData.shiftPreferences,
        contractedHours: Number(formData.contractedHours),
        maxShiftsPerWeek: Number(formData.maxShiftsPerWeek),
        minRestHoursBetweenShifts: Number(formData.minRestHoursBetweenShifts),
        phone: formData.phone,
        availability: formData.workingDays.reduce((acc, day) => ({
          ...acc,
          [day.toLowerCase()]: formData.shiftPreferences
        }), {})
      })
      toast.success('Staff member added successfully')
      router.push("/staff")
    } catch (error) {
      console.error("Error adding staff member:", error)
      toast.error('Failed to add staff member')
    } finally {
      setLoading(false)
    }
  }

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }))
  }

  const handleShiftToggle = (shift: ShiftType) => {
    setFormData(prev => ({
      ...prev,
      shiftPreferences: prev.shiftPreferences.includes(shift)
        ? prev.shiftPreferences.filter(s => s !== shift)
        : [...prev.shiftPreferences, shift]
    }))
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Add Staff Member</h1>
            <p className="text-gray-600">Enter the details of your new team member</p>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="role">
                Role
              </label>
              <Select.Root
                value={formData.role}
                onValueChange={(value: Role) => 
                  setFormData(prev => ({ ...prev, role: value }))
                }
              >
                <Select.Trigger
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Role"
                >
                  <Select.Value placeholder="Select a role" />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                      <ChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      {roles.map((role) => (
                        <Select.Item
                          key={role.id}
                          value={role.id}
                          className={cn(
                            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          )}
                        >
                          <Select.ItemText>{role.name}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                            <Check className="h-4 w-4" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                      <ChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="contractedHours">
                  Contracted Hours/Week
                </label>
                <Input
                  id="contractedHours"
                  name="contractedHours"
                  type="number"
                  min="0"
                  max="168"
                  value={formData.contractedHours}
                  onChange={handleChange}
                  required
                  placeholder="37.5"
                />
                <p className="text-sm text-gray-500 mt-1">Hours per week</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="maxShiftsPerWeek">
                  Max Shifts/Week
                </label>
                <Input
                  id="maxShiftsPerWeek"
                  name="maxShiftsPerWeek"
                  type="number"
                  min="1"
                  max="7"
                  value={formData.maxShiftsPerWeek}
                  onChange={handleChange}
                  required
                  placeholder="5"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum shifts per week</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="minRestHoursBetweenShifts">
                  Min Rest Hours
                </label>
                <Input
                  id="minRestHoursBetweenShifts"
                  name="minRestHoursBetweenShifts"
                  type="number"
                  min="11"
                  value={formData.minRestHoursBetweenShifts}
                  onChange={handleChange}
                  required
                  placeholder="11"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum rest between shifts</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Working Days
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.workingDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Shift Preferences
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHIFT_TYPES.map(shift => (
                  <div key={shift} className="flex items-center space-x-2">
                    <Checkbox
                      id={`shift-${shift}`}
                      checked={formData.shiftPreferences.includes(shift)}
                      onCheckedChange={() => handleShiftToggle(shift)}
                    />
                    <label
                      htmlFor={`shift-${shift}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {shift}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Staff Member"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/staff">Cancel</Link>
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">
            After adding a staff member, you can set their working hours and assign them to shifts in the schedule.
          </p>
        </div>
      </div>
    </div>
  )
} 