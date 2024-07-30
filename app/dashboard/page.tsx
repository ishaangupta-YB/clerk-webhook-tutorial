import prisma from "@/db/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { UserButton } from "@clerk/nextjs";

async function page() {
  try {
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
          <p className="text-lg mb-2">Welcome, {user.firstName}!</p>
          <p className="text-lg mb-4">
            Your email: {user.emailAddresses[0].emailAddress}
          </p>
          {dbUser && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">
                Database User Info:
              </h2>
              <p className="text-lg">Clerk ID: {dbUser.clerkId}</p>
              {dbUser.username && (
                <p className="text-lg">Username: {dbUser.username}</p>
              )}
              {dbUser.email && <p className="text-lg">Email: {dbUser.email}</p>}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    redirect("/sign-in");
  }
}

export default page;
