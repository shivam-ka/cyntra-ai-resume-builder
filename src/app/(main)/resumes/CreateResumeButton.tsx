"use client";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumMoal = usePremiumModal();
  const router = useRouter();

  return (
    <div className="group cursor-pointer">
      <div
        onClick={() =>
          canCreate ? router.push("/editor") : premiumMoal.setOpen(true)
        }
        className="group-hover:border-accent-foreground/50 bg-accent flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all hover:shadow-sm"
      >
        <PlusSquare className="h-8 w-8" />
        <h3 className="font-medium">Create New Resume</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Start from scratch or use a template
        </p>
      </div>
    </div>
  );
}
