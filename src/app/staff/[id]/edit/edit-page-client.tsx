"use client"

import { EditStaffPage } from "./edit-staff-page"

interface EditPageClientProps {
  id: string
}

export default function EditPageClient({ id }: EditPageClientProps) {
  return <EditStaffPage id={id} />
} 