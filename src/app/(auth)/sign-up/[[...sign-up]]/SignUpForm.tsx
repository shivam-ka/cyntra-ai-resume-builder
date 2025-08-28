"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpForm() {
  const { theme } = useTheme();
  return (
    <SignUp
      appearance={{
        theme: theme === "dark" ? dark : undefined,
      }}
    />
  );
}
