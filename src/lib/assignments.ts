import { AssignmentStatus, Class, Assignment } from "@prisma/client";
import { getStartAndEndOfDate } from "./utils/dateUtils";

export type AssignmentWithClass = ({
    classes: Class[]
} & Assignment);

export type AssignmentStatusFilterMode = 'recent' | 'past-due' | 'completed';
export type AssignmentDueFilterMode = 'day' | 'week' | 'month'

export function filterAssignmentOnStatus(
  assignments: AssignmentWithClass[], 
  mode: AssignmentStatusFilterMode
) {
  const modeToStatus: Record<AssignmentStatusFilterMode, AssignmentStatus> = {
    recent: 'pending',
    "past-due": 'pastdue',
    completed: 'completed'
  }

  return assignments.filter(v => v.status === modeToStatus[mode]);
}

export function filterAssignmentOnDue(
  assignments: AssignmentWithClass[], 
  mode: AssignmentDueFilterMode
) {
  const filterToday = (a: AssignmentWithClass[]) => {
    const dateToday = new Date();

    return a.filter(v => v.submissionDate === dateToday);
  }
  const filterWeek = (a: AssignmentWithClass[]) => {
    const { start, end } = getStartAndEndOfDate('week', true);

    return a.filter(v => {
      if (v.submissionDate >= start && v.submissionDate <= end) return v;
    })
  }
  const filterMonth = (a: AssignmentWithClass[]) => {
    const { start, end } = getStartAndEndOfDate('month', true)

    return a.filter(v => {
      if (v.submissionDate >= start && v.submissionDate <= end) return v;
    })
  }

  const values: Record<AssignmentDueFilterMode, AssignmentWithClass[]> = {
    'day': filterToday(assignments),
    'week': filterWeek(assignments),
    'month': filterMonth(assignments)
  }

  return values[mode];
}