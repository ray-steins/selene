import { AssignmentDisplay } from "./dashboard/components/ui/AssignmentDisplay";
import { getCurrentUserFromServer, getUserClasses } from "@/data/user";
import HomePageClient from "./Home";

export default async function MainPage() {
  const currentUser = await getCurrentUserFromServer();
  if (!currentUser) return <span>Not signed in yet.</span>

  const userClasses = await getUserClasses(currentUser.id) ?? [];

  return (
    <>
      <HomePageClient 
        user={currentUser}
        classes={userClasses}
      />
    </>
  )
}