"use client";
import { EditorFormPorps } from "@/lib/types";
import { summarySchema, summaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import GenerateSummaryButton from "./GenerateSummaryButton";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormPorps) {
  const form = useForm<summaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({ ...resumeData, ...values });
    });

    return unsubscribe;
  }, [form, setResumeData, resumeData]);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Professional Summary
        </h2>
        <p className="text-muted-foreground text-sm">
          Write a short summary (2–4 sentences) highlighting your career
          achievements, expertise, and what makes you stand out.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    autoFocus
                    placeholder="Example: Experienced Frontend Developer with 5+ years of expertise in building scalable web applications using React and Next.js."
                  />
                </FormControl>
                <FormMessage />
                <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
