import { getClasses } from "@/data/class"
import ClassesPageClient from "./Classes"

/** Class without `id` */
export type ClassType = {
  name: string,
  slug: string
}

export default async function ClassesPage() {
  const classes = await getClasses();

  return (
    <>
      <ClassesPageClient classList={classes}/>
    </>
  )
}