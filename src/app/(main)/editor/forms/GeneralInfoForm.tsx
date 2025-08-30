"use client";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { EditorFormPorps } from "@/lib/types";
import { useEffect } from "react";

export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormPorps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">General Info</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear in your resume
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Resume Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="e.g., Frontend Developer, Data Analyst"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-32 min-h-16 w-full"
                    rows={5}
                    {...field}
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
