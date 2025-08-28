"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInForm() {
  const { theme } = useTheme();
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          theme: theme === "dark" ? dark : undefined,
        }}
      />
    </main>
  );
}
