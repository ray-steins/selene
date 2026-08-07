'use client';

import { notFound } from "next/navigation";
import { ClassComplete } from "./page";
import { AssignmentDisplay } from "../../components/ui/AssignmentDisplay";
import { DashboardPercentageContianer } from "../../components/ui/DashboardContainer";

import style from './class-info.module.scss';
import { filterAssignmentOnDue } from "@/lib/assignments";

export default function ClassSlugClient({
  data,
}: {
  data: ClassComplete
}) {
  if (!data) notFound();

  const assignmentsThisWeek = filterAssignmentOnDue(data.assignments, 'week');

  return (
    <div className={style['class-info-wrapper']}>
      <h3>{ data.name }</h3>
      <section className={style['class-info-wrapper__assignment-section']}>
        <section className={style['class-info-wrapper__assignment-section__upper']}>
          <DashboardPercentageContianer title='Total Assignments'
            max={data.assignments.length}
            value={data.assignments.filter(v => v.status === 'completed').length}
          />
          <DashboardPercentageContianer title='Total Assignments This Week' 
            max={assignmentsThisWeek.length}
            value={assignmentsThisWeek.filter(v => v.status === 'completed').length}
          />
        </section>
        <section className={style['class-info-wrapper__assignment-section__lower']}>
          <AssignmentDisplay 
            assignments={data.assignments ?? []}
            title="Assignments"
            showStatus
          />
        </section>
      </section>
    </div>
  )
}