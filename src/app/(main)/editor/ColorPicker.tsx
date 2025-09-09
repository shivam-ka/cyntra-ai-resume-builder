"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, SketchPicker } from "react-color";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPop, setShowPop] = useState(false);

  return (
    <Popover open={showPop} onOpenChange={setShowPop}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPop(!showPop)}
          className="dark:bg-black/70 dark:hover:bg-black/80"
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="end">
        <SketchPicker
          color={color}
          onChange={onChange}
          className="text-black"
        />
      </PopoverContent>
    </Popover>
  );
}
