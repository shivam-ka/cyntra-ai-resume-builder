import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  disabled,
  loading,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader className="size-4 animate-spin" />}
      {props.children}
    </Button>
  );
}
