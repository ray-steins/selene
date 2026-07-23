'use client'
import { AssignmentType } from "@/data/assignments"
import CreateAssignmentModal from "./components/CreateAssignmentModal"
import { AssignmentDisplay } from "../components/AssignmentDisplay"
import { Class } from "@prisma/client"

type DataProps = {
  assignments: AssignmentType[],
  classes: Class[]
}

export default function AssignmentsPageClient({
  assignments,
  classes
}: DataProps) {
  return (
     <div>
      <AssignmentDisplay assignments={assignments} classes={classes}/>
     </div>
  )
}