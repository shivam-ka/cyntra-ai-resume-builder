import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-center md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
        </h1>
        <p className="text-lg text-muted-foreground">
          Our <span className="font-bold">AI resume builder</span> helps you
          design a professional resume, even if you&apos;re not very smart.
        </p>
        <Button asChild size="lg">
          <Link href="/resumes">Get started</Link>
        </Button>
      </div>
      <div>
        <Image
          src="/logo.png"
          alt="Resume preview"
          width={600}
          height={600}
          className=" lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  )
}
