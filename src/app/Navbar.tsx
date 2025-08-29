"use client";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="border-primary sticky top-0 right-0 z-50 flex justify-between border-b bg-black/5 py-4 backdrop-blur-md md:px-10">
      <Link href={"/"} className="flex items-center gap-2 rounded-md px-4 py-1">
        <Image
          src="/logo.png"
          width={36}
          height={36}
          alt="Cyntra Resume Builder"
          draggable={false}
          className="aspect-auto md:w-12"
        />
        <h1 className="text-sm font-bold md:text-base">
          Cyntra Ai Resume Builder
        </h1>
      </Link>
      <div className="flex items-center">
        <ThemeToggleButton start="center" variant="circle" />
        <UserButton
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="Billing"
              labelIcon={<CreditCard className="size-4" />}
              href="/billling"
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </header>
  );
}
