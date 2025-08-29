import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default function Page() {
  return <main>
    <Button asChild >
        <Link href="/editor" >
           <PlusSquare /> New Resume
        </Link>
    </Button>
  </main>;
}
