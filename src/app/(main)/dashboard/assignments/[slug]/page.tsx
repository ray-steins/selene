import { getAssignmentBySlug } from "@/data/assignments";
import AssignmentSlugClient from "./AssignmentSlug";

export default async function AssignmentSlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const data = await getAssignmentBySlug(slug);

  return (
    <>
      <AssignmentSlugClient data={data} />
    </>
  )
}