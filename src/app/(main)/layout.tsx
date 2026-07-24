import { UserProvider } from "@/contexts/UserContex";
import { getCurrentUserFromServer } from "@/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentuser = await getCurrentUserFromServer();

  return (
    <>
    <UserProvider
      initialUser={currentuser ? { ...currentuser, image: currentuser.image ?? null } : undefined}
    >
      { children }
    </UserProvider>
    </>
  )
}