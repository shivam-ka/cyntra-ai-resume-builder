import { Button } from "@/components/ui/button";
import {
  generateWorkExperienceInput,
  generateWorkExperienceSchema,
  workExperience,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { generateWorkExperience } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}

export default function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setShowInputDialog(true)}>
        <WandSparklesIcon className="size-4" />
        Smart Fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChnage={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogPops {
  open: boolean;
  onOpenChnage: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}

function InputDialog({
  open,
  onOpenChnage,
  onWorkExperienceGenerated,
}: InputDialogPops) {
  const form = useForm<generateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onClick(input: generateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.error(error);
      toast.error("please try again");
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChnage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate work experience</DialogTitle>
            <DialogDescription>
              Describe this work experience and the AI will generate an
              optimized entry for you.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onClick)} className="space-y-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={`E.g. "from nov 2019 to dec 2020 I worked at google as a software engineer, my tasks were: ..."`}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                className="justify-self-end"
              >
                {form.formState.isSubmitting ? "Generating..." : "Generate"}
              </LoadingButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
