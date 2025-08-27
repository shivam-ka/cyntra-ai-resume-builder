import { Metadata } from "next";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Sing In",
};

export default function Page() {
    return <SignInForm />
}