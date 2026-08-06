'use client'

import { User } from "better-auth"
import { AssignmentDisplay } from "./dashboard/components/ui/AssignmentDisplay"
import { AssignmentWithClass } from "@/lib/assignments"
import { UserClasses } from "@/data/user"
import { ROUTES } from "@/configs/app.config"

export default function HomePageClient() {
  return (
    <div>
      <h1>Welcome to Selene!</h1>
    </div>
  )
}