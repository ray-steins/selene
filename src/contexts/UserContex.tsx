"use client"

import type { User } from "@/generated/prisma/client";

import { createContext, useState, useMemo, type Dispatch, type SetStateAction } from "react";

type UserContextValue = {
  user?: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type UserProviderProps = {
  children: React.ReactNode;
  initialUser?: User;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({
  children,
  initialUser
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser!);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}