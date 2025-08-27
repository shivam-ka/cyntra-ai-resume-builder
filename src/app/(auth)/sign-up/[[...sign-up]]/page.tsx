import { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sing Up",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUpForm />
    </main>
  );
}
