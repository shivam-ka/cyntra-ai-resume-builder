import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Billing Successful 🎉
        </h1>
        <p className="mt-2 text-gray-600">
          Your billing process has been completed successfully.
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/resumes">Go to Resumes</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
