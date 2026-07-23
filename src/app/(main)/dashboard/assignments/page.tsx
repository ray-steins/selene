import { getAssignments } from "@/data/assignments";
import AssignmentsPageClient from "./Assignments";
import { getUserClasses } from "@/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AssignmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const currentUser = session?.user;

  const assignments = await getAssignments();
  const classes = await getUserClasses(currentUser!.id);

  if (!classes) redirect('/classes');

  return (
    <>
      <AssignmentsPageClient
        assignments={assignments}
        classes={classes}
      />
    </>
  )
}