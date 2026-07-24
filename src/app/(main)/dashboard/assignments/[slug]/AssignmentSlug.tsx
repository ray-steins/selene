'use client';

import { AssignmentComplete } from "@/data/assignments";
import { fixDate } from "@/lib/stringUtils";
import { notFound } from "next/navigation";

export default function AssignmentSlugClient({ data }: { data: AssignmentComplete }) {
  if (!data) notFound();

  const submissionDate = data.submissionDate ? fixDate(data.submissionDate) : 'Unspecified.';
  const classes = data.classes ? data.classes.map(c => `${c.name}${data.classes.length <= 1 ? '' : ', '}`) : 'Unspecified';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h2>{ data.title }</h2>
        <p>{ data.description }</p>
        <span>Sumission Date: {submissionDate}</span>
        <span>Class(es): { classes }</span>
      </div>
    </div>
  )
} 