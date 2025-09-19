"use client";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useState } from "react";
import { toast } from "sonner";
import createCheckoutSession from "./action";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setIsLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Something Went Wrong try again");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isLoading) {setOpen(open)};
      }}
    >
      <DialogContent className="md:min-w-2xl">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Cyntra ai Resume builder Premium
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                disabled={isLoading}
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!
                  )
                }
              >
                {isLoading ? "Loading...": "Get Premium"}
              </Button>
            </div>
            <div className="mx-6 border-1" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold text-amber-500">
                Premium Plus
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                disabled={isLoading}
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!
                  )
                }
                className="bg-amber-500 hover:bg-amber-600"
              >
                {isLoading ? "Loading...": "Get Premium Plus"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
