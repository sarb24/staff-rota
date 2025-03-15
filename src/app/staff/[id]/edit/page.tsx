import { Metadata } from "next"
import EditPageClient from "./edit-page-client"

export const metadata: Metadata = {
  title: "Edit Staff Member",
  description: "Edit staff member details"
}

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <EditPageClient id={id} />
} 