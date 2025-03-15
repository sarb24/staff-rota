"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StaffEditForm } from "@/components/staff-edit-form"
import { useStaff } from "@/contexts/StaffContext"
import { toast } from "sonner"

interface EditStaffPageProps {
  id: string
}

export function EditStaffPage({ id }: EditStaffPageProps) {
  const router = useRouter()
  const { staff } = useStaff()

  useEffect(() => {
    const staffMember = staff.find(s => s.id === parseInt(id))
    if (!staffMember) {
      toast.error("Staff member not found")
      router.push("/staff")
    }
  }, [staff, id, router])

  return <StaffEditForm id={id} />
} 