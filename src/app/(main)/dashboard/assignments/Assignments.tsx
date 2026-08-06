'use client'
import { AssignmentDisplay, AssignmentDisplayProps, AssignmentTabData } from "../components/ui/AssignmentDisplay"
import { DashboardPercentageContianer } from "../components/ui/DashboardContainer"

import style from './dashboard-assignments.module.scss'
import { AssignmentWithClass, filterAssignmentOnDue, filterAssignmentOnStatus } from "@/lib/assignments"

export default function AssignmentsPageClient({
  assignments,
}: {
  assignments: AssignmentWithClass[]
}) {
  const sortedAssignments = assignments.sort((a, b) => a.submissionDate.getTime() - b.submissionDate.getTime());

  const filteredAssignmentsOnStatus = {
    recent: filterAssignmentOnStatus(sortedAssignments, 'recent'),
    pastdue: filterAssignmentOnStatus(sortedAssignments, 'past-due'),
    completed: filterAssignmentOnStatus(sortedAssignments, 'completed')
  }

  const filteredAssignmentsOnDate = {
    today: filterAssignmentOnDue(sortedAssignments, 'day'),
    week: filterAssignmentOnDue(sortedAssignments, 'week'),
    month: filterAssignmentOnDue(sortedAssignments, 'month'),
  }

  const AssignmentGeneralTabs: AssignmentTabData[] = [
    {
      name: 'Recent',
      assignments: filteredAssignmentsOnStatus.recent
    },
    {
      name: 'Past Due',
      assignments: filteredAssignmentsOnStatus.pastdue
    },
    {
      name: 'Completed',
      assignments: filteredAssignmentsOnStatus.completed
    }
  ]

  const AssignmentsSubmissionTabs: AssignmentTabData[] = [
    {
      name: 'This day',
      assignments: filteredAssignmentsOnDate.today
    },
    {
      name: 'This week',
      assignments: filteredAssignmentsOnDate.week
    },
    {
      name: 'This month',
      assignments: filteredAssignmentsOnDate.month
    }
  ]

  return (
    <div className={style['assignment-lists-wrapper']}>
      <div className={`${style['assignment-lists-wrapper__main']} ${style['section']}`}>
        <div className={style['assignment-lists-wrapper__main__upper']}>
          <DashboardPercentageContianer title='Completed assignments' 
            max={assignments.length}
            value={assignments.filter(v => v.status === 'completed').length}
          />
          <DashboardPercentageContianer title='Completed assignments this week' 
            max={filteredAssignmentsOnDate.week.length}
            value={filteredAssignmentsOnDate.week.filter(v => v.status === 'completed').length}
          />
        </div>
        <div className={style['assignment-lists-wrapper__main__lower']}>
          <AssignmentDisplay tab 
            assignmentTabs={AssignmentGeneralTabs}
            title='Your assignments'
          />
          <AssignmentDisplay tab
            assignmentTabs={AssignmentsSubmissionTabs}
            title='To be submitted'
          />
        </div>
      </div>
    </div>
  )
}