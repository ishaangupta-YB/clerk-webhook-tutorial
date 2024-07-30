import prisma from "@/db/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { UserButton } from "@clerk/nextjs";

async function page() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome</p>
      <p>Your email: {user.emailAddresses[0].emailAddress}</p>
      {dbUser && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Database User Info:</h2>
          <p>Clerk ID: {dbUser.clerkId}</p>
          {dbUser.username && <p>Username: {dbUser.username}</p>}
          {dbUser.email && <p>Email: {dbUser.email}</p>}
        </div>
      )}
      <div className="mt-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default page;
