import AuthLayout from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Welcome to FreshMart"
      subtitle="Join us for the freshest groceries delivered to your door"
    >
      <SignUpForm />
    </AuthLayout>
  );
}