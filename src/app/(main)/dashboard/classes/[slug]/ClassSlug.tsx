'use client';

import { notFound } from "next/navigation";
import { ClassComplete } from "./page";
import { AssignmentDisplay } from "../../components/ui/AssignmentDisplay";
import { Class } from "@/generated/prisma";

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
      </div>
    </>
  )
}