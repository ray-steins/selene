import { getAssignmentBySlug } from "@/data/assignments";
import AssignmentSlugClient from "./AssignmentSlug";
import { getCurrentUserFromServer } from "@/data/user";

export default async function AssignmentSlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const user = await getCurrentUserFromServer();

  const slug = (await params).slug;
  const data = await getAssignmentBySlug(slug, user?.id);

  return (
    <>
      <AssignmentSlugClient data={data} />
    </>
  )
}