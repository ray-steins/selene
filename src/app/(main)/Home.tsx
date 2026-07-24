'use client'

import { User } from "better-auth"
import { AssignmentDisplay } from "./dashboard/components/AssignmentDisplay"
import { UserClasses } from "@/data/user"
import { AssignmentType } from "@/data/assignments"
import { ROUTES } from "@/configs/app.config"

function AssignmentDisplaySection({ classes }: { classes: UserClasses }) {
  if (!classes || classes.length === 0) return <h1>You are not in any class.</h1>

  const assignments: AssignmentType[] = classes.flatMap(v => v.assignments);

  return (
    <div>
      <h2>Assignments</h2>
      <AssignmentDisplay assignments={assignments} classes={classes}/>
    </div>
  )
}

function ClassDisplaySection({ classes }: { classes: UserClasses }) {
  const Display = () => {
    return (
      <>
        {classes?.map((v, i) => {
          const link = `${ROUTES.dashboard.classes}${v.slug}`
          
          return (
            <a href={link} key={`${v}-${i}`}>
              <div>
                <span>{ v.name }</span>
              </div>
            </a>
          )
        })}      
      </>
    )
  }

  return (
    <div>
      <h1>Classes</h1>
      <Display />
    </div>
  )
}

export default function HomePageClient({
  user,
  classes
}: {
  user: User
  classes: UserClasses
}) {
  return (
    <div>
      <AssignmentDisplaySection classes={classes}/>
      <ClassDisplaySection classes={classes}/>
    </div>
  )
}