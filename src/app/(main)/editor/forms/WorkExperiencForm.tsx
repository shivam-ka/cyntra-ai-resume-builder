"use client";
import { EditorFormPorps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValue } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function WorkExperiencForm({
  resumeData,
  setResumeData,
}: EditorFormPorps) {
  const form = useForm<WorkExperienceValue>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperience: resumeData.workExperience || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperience: values.workExperience?.filter(
          (exp) => exp !== undefined
        ),
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Work Experience
        </h2>
        <p className="text-muted-foreground text-sm">
          Add your work Experience
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <WorkExperienceItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <Button
            type="button"
            onClick={() =>
              append({
                company: "",
                description: "",
                startDate: "",
                endDate: "",
                position: "",
              })
            }
          >
            Add Work Experience
          </Button>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValue>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
  return (
    <div className="border-muted-foreground space-y-5 rounded-sm border px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 font-semibold">
          <BriefcaseBusiness className="size-4" />
          Work Experience - {index + 1}
        </span>
        <span title="move ">
          <GripHorizontal className="size-5 cursor-grab active:cursor-grabbing" />
        </span>
      </div>

      <FormField
        control={form.control}
        name={`workExperience.${index}.position`}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Job Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="w-full"
                placeholder="Enter your job title"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperience.${index}.company`}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Company</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="w-full"
                placeholder="Enter company name"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`workExperience.${index}.startDate`}
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`workExperience.${index}.endDate`}
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
            </FormItem>
          )}
        />
      </div>

      <FormDescription className="text-xs">
        Leave <span className="font-medium">End Date</span> empty if you are
        currently working here.
      </FormDescription>

      <FormField
        control={form.control}
        name={`workExperience.${index}.description`}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm font-medium">Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="w-full"
                placeholder="Describe your role and responsibilities"
              />
            </FormControl>
          </FormItem>
        )}
      />

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
