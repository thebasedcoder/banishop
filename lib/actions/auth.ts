"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Email, checkRequestCooldown, createToken } from "@/lib/auth-helpers";

// Expanded validation schema
const SignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

export interface SignupActionState {
  status: "success" | "error";
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
    _form?: string[];
  };
}

export async function signUp(
  prevState: SignupActionState,
  formData: FormData
): Promise<SignupActionState> {

  const validatedFields = SignupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      checkRequestCooldown(existingUser);

      // CORRECTED: Use string literals for comparison
      switch (existingUser.status) {
        case 'ACTIVE': {
          const { plaintext, hashed } = await createToken();
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              verificationToken: hashed,
              verificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
              lastVerifyRequestAt: new Date(),
            },
          });
          await new Email(existingUser).sendMagicLoginLink(plaintext);
          break;
        }
        case 'PENDING_VERIFICATION': {
          const { plaintext, hashed } = await createToken();
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              verificationToken: hashed,
              verificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
              lastVerifyRequestAt: new Date(),
            },
          });
          await new Email(existingUser).sendCompleteRegistrationLink(plaintext);
          break;
        }
        case 'SUSPENDED':
        case 'BANNED':
        case 'DEACTIVATED':
          console.log(`Signup attempt for inactive account: ${email}`);
          break;
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { plaintext, hashed } = await createToken();

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: email.split('@')[0],
          verificationToken: hashed,
          verificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
          // The default status is set in the schema, so no need to specify it here
        },
      });

      await new Email(newUser).sendCompleteRegistrationLink(plaintext);
    }

    return {
      status: "success",
      message: "If an account with this email exists, a message has been sent to it.",
    };

  } catch (error: any) {
    console.error("Signup Error:", error);
    return {
      status: "error",
      message: error.message || "An unexpected error occurred. Please try again.",
      errors: { _form: [error.message || "Something went wrong."] },
    };
  }
}