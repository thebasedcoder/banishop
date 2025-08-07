"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getMyOrders() {
  const { userId } = await auth(); // This is the Clerk ID

  if (!userId) {
    throw new Error("You must be signed in.");
  }

  // Find the user in your local database using the Clerk ID
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      // Include their orders
      orders: {
        include: {
          items: true, // Also include the order items
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found in our database.");
  }

  return user.orders;
}