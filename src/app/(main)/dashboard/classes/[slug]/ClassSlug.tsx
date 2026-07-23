'use client';

import { notFound } from "next/navigation";
import { ClassComplete } from "./page";
import { AssignmentDisplay } from "../../components/AssignmentDisplay";
import { Class } from "@prisma/client";

export default function ClassSlugClient({
  data,
  classList
}: {
  data: ClassComplete
  classList: Class[]
}) {
  if (!data) notFound();

  return (
    <>
      <h1>{ data.name }</h1>
      <div>
        <AssignmentDisplay assignments={data.assignments} classes={classList}/>
      </div>
    </>
  )
}