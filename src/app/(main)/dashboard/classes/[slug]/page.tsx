import { getClassBySlug, getClasses } from "@/data/class";
import ClassSlugClient from "./ClassSlug";
import { getUserClasses } from "@/data/user";
import { getCurrentUserFromServer } from "@/data/user";

export type ClassComplete = Awaited<ReturnType<typeof getClassBySlug>>;

function NotInClass() {
  return (
    <div>
      <h1>You do not have access to this class.</h1>
    </div>
  )
}

export default async function ClassSlug({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const currentUser = await getCurrentUserFromServer();

  const slug = (await params).slug;

  const classData: ClassComplete = await getClassBySlug(slug, currentUser?.id);
  const userClasses = await getUserClasses(currentUser!.id);

  if (!userClasses?.some(c => c.slug === slug)) return <NotInClass />;

  return (
    <>
      <ClassSlugClient data={classData}/>
    </>
  )
}