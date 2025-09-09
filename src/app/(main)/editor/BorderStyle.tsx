"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Pen } from "lucide-react";
import { useState } from "react";

export default function BorderStyle({
  onChange,
}: {
  onChange: (borderRadius: number) => void;
}) {
  const [showPop, setShowPop] = useState(false);
  const [borderRadius, setBorderRadius] = useState(0);

  const onChangeHandler = (value: number) => {
    setBorderRadius(value);
    onChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={showPop} onOpenChange={setShowPop}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowPop(!showPop)}
            className="dark:bg-black/70 dark:hover:bg-black/80"
          >
            <Pen size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rounded</span>
              <Input
                value={borderRadius}
                onChange={(e) => onChangeHandler(Number(e.target.value))}
                className="w-11"
              />
            </div>
            <Slider
              defaultValue={[borderRadius]}
              value={[borderRadius]}
              max={50}
              step={1}
              onValueChange={(value) => onChangeHandler(value[0])}
              className="cursor-pointer"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
