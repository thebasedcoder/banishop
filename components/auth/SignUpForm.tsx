"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp, SignupActionState } from "@/lib/actions/auth"; // Your existing server action
import { Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link";

const initialState: SignupActionState = { status: "error", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary hover:bg-red-700" disabled={pending}>
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

export function SignUpForm() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <Card className="w-full max-w-md bg-white/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="email" name="email" type="email" placeholder="you@example.com" required className="pl-9" />
            </div>
            {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="password" name="password" type="password" required className="pl-9" />
            </div>
            {state.errors?.password && <p className="text-sm text-red-500">{state.errors.password[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="passwordConfirm" name="passwordConfirm" type="password" required className="pl-9" />
            </div>
            {state.errors?.passwordConfirm && <p className="text-sm text-red-500">{state.errors.passwordConfirm[0]}</p>}
          </div>

          {state.errors?._form && <p className="text-sm text-red-500">{state.errors._form[0]}</p>}
          {state.status === 'success' && <p className="text-sm text-green-500">{state.message}</p>}

          <SubmitButton />
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}