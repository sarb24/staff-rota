"use client"

import { StaffEditForm } from "@/components/staff-edit-form"

interface StaffEditWrapperProps {
  id: string
}

export function StaffEditWrapper({ id }: StaffEditWrapperProps) {
  return <StaffEditForm id={id} />
} 