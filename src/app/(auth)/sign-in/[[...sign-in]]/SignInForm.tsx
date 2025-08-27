import { SignIn } from "@clerk/nextjs";

export default function SignInForm() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  );
}
