import { UserProvider } from "@/contexts/UserContex";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <>
    <UserProvider
      initialUser={session?.user ? { ...session.user, image: session.user.image ?? null } : undefined}
    >
      { children }
    </UserProvider>
    </>
  )
}