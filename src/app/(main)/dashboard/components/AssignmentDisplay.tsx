import { AssignmentType } from "@/data/assignments";
import CreateAssignmentModal from "../assignments/components/CreateAssignmentModal";
import { Class } from "@prisma/client";

function NoAssignmentMessage() {
  return (
    <div>
      <h1>No Assignments yet.</h1>
    </div>
  )
}

function Assignments({ assignments }: { assignments: AssignmentType[] }) {
  return (
    <div>
      {assignments.map((v, i) => {
        const formattedDate = v.submissionDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'short'})

        return (
          <div key={`${v.title}-${i}`}>
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span>Title: { v.title }</span>
              <span>Submission Date: {`${ formattedDate }`}</span>
              <span>Class(es): {v.classes.map(c => `${c.name}${v.classes.length === 0 ? '' : ', '}`)}</span>
              <span>Description: { v.description }</span>
            </div>
          </div>
        )
      })}      
    </div>
  )  
}

export function AssignmentDisplay({ 
  assignments,
  classes
}: { 
  assignments: AssignmentType[]
  classes: Class[]
}) {
  return (
    <div>
      { assignments.length <= 0 ? <NoAssignmentMessage /> : <Assignments assignments={assignments} /> }
      <CreateAssignmentModal classes={classes} />
    </div>
  )
}