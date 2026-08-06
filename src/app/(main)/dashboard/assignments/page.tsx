import AssignmentsPageClient from "./Assignments";
import { getUserClasses } from "@/data/user";
import { getCurrentUserFromServer } from "@/data/user";

import { redirect } from "next/navigation";

export default async function AssignmentsPage() {
  const currentUser = await getCurrentUserFromServer();
    
  const classes = await getUserClasses(currentUser!.id);
  if (!classes) redirect('/classes');

  const userAssignmentsFromClass = classes.flatMap(v => v.assignments);

  return (
    <>
      <AssignmentsPageClient
        assignments={userAssignmentsFromClass}
      />
    </>
  )
}