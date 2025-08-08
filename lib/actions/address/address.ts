"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Define the validation schema for the address form
const AddressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  street: z.string().min(3, { message: "Please enter a valid street." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  zip: z.string().min(4, { message: "Please enter a valid ZIP code." }),
});

// 2. Define the shape of the state object the action will return
export interface ActionState {
  status: "success" | "error";
  message: string;
  errors?: {
    name?: string[];
    street?: string[];
    city?: string[];
    zip?: string[];
    _form?: string[];
  };
}

export async function addAddress(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 3. Authentication and Authorization Check
  const { userId: clerkId } = await auth(); // This is the Clerk user ID

  if (!clerkId) {
    return {
      status: "error",
      message: "Unauthorized",
      errors: { _form: ["You must be signed in to add an address."] },
    };
  }

  // 4. Validate the form data
  const validatedFields = AddressSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, street, city, zip } = validatedFields.data;

  try {
    // 5. IDOR Prevention: Find the user in YOUR database using the SECURE clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { addresses: true }, // Include existing addresses to check count
    });

    if (!user) {
      throw new Error("User not found in the database. Please contact support.");
    }

    // 6. Business Logic: Determine if this should be the default address
    const isDefault = user.addresses.length === 0;

    // 7. Create the address, securely linking it to the authenticated user
    await prisma.address.create({
      data: {
        name,
        street,
        city,
        zip,
        isDefault,
        userId: user.id, // This links to YOUR user ID, not a user-provided one
      },
    });

    // 8. Revalidate the path to update the UI automatically
    revalidatePath('/dashboard/addresses');

    return {
      status: "success",
      message: "Address added successfully.",
    };

  } catch (error: any) {
    console.error("Add Address Error:", error);
    return {
      status: "error",
      message: "An unexpected error occurred.",
      errors: { _form: [error.message || "Something went wrong."] },
    };
  }
}