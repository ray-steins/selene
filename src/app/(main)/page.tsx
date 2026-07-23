'use client';

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContex";

export default function MainPage() {
  const user = useContext(UserContext);
  const currentUser = user?.user;

  const message = currentUser ? `Hi ${ currentUser?.email }` : `You're not signed in yet.`

  return (
    <>
      <h1>{ message }</h1>
      <p>Welcome to Selene, an assignment tracker application designed by Ray Steins.</p>
    </>
  )
}