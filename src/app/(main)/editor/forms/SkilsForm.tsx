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
  FormDescription,
} from "@/components/ui/form";
import { EditorFormPorps } from "@/lib/types";
import { skillsSchema, SkillValues } from "@/lib/validation";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormPorps) {
  const form = useForm<SkillValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="text-muted-foreground text-sm">
          Enter Your Skills (comma-separated)
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Graphic design, Vfx, JavaScript, React, TypeScript, CSS"
                    autoFocus
                    onChange={(e) => {
                      const skillsArray = e.target.value.split(",");
                      field.onChange(skillsArray);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Seprate each skill with comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
