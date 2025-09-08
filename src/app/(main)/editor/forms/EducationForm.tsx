"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormPorps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { useEffect } from "react";
import { BriefcaseBusiness, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormPorps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        education: values.education?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Eduction</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear in your resume
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <EducationItem
              form={form}
              index={index}
              remove={remove}
              key={field.id}
            />
          ))}
          <Button
            type="button"
            onClick={() =>
              append({
                degree: "",
                startDate: "",
                endDate: "",
                school: "",
              })
            }
          >
            Add Education
          </Button>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="border-muted-foreground space-y-5 rounded-sm border px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 font-semibold">
          <BriefcaseBusiness className="size-4" />
          Education - {index + 1}
        </span>
        <span title="move ">
          <GripHorizontal className="size-5 cursor-grab active:cursor-grabbing" />
        </span>
      </div>

      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`education.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-medium">Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-medium">End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        variant="destructive"
        type="button"
        onClick={() => remove(index)}
        className="w-full rounded-sm md:w-auto dark:bg-red-600"
      >
        Remove
      </Button>
    </div>
  );
}
