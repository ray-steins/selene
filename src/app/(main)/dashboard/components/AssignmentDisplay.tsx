import { AssignmentType } from "@/data/assignments";
import CreateAssignmentModal from "../assignments/components/CreateAssignmentModal";
import { Class } from "@prisma/client";
import { fixDate } from "@/lib/stringUtils";
import { ROUTES } from "@/configs/app.config";

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
        const submissionDate = v.submissionDate ? fixDate(v.submissionDate) : 'Unspecified.';
        const classes = v.classes ? v.classes.map(c => `${c.name}${v.classes.length <= 1 ? '' : ', '}`) : 'Unspecified';

        const link = `${ROUTES.dashboard.assignments}${v.slug}`;

        return (
          <a key={`${v.title}-${i}`} href={link}>
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid #000'
              }}>
                <span>Title: { v.title }</span>
                <span>Submission Date: {`${ submissionDate }`}</span>
                <span>Class(es): { classes }</span>
                <span>Description: { v.description }</span>
              </div>
            </div>            
          </a>
        )
      })}      
    </div>
  )  
}

export type AssignmentDisplayProps = {
  assignments: AssignmentType[],
  classes: Class[]
}

export function AssignmentDisplay({ 
  assignments,
  classes
}: AssignmentDisplayProps) {
  return (
    <div>
      { assignments.length <= 0 ? <NoAssignmentMessage /> : <Assignments assignments={assignments} /> }
      <CreateAssignmentModal classes={classes} />
    </div>
  )
}