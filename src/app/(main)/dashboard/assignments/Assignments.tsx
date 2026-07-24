'use client'
import CreateAssignmentModal from "./components/CreateAssignmentModal"
import { AssignmentDisplay, AssignmentDisplayProps } from "../components/AssignmentDisplay"

type DataProps = {} & AssignmentDisplayProps

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