"use client";

import { organizationSchema } from "@/src/lib/zodSchema/organizationSchema";
import ToggleSidebarButton from "@/src/ui/components/ToggleSidebarButton";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const NewOrganizationIndex = () => {
  // Form
  const {
    control,
    // watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(organizationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Watch
  // const name = watch("name");
  // const description = watch("description");

  return (
    <div className="">
      {/* Header */}
      <header className="p-4 border rounded-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-header">Create New Organization</h1>
          <p className="text-sm font-light">
            We suggest you to read our guide on{" "}
            <span className="italic font-normal">Application Flow</span> to
            learn more about what Organization is on this platform if you
            haven&apos;t
          </p>
        </div>
        <div className="flex items-center justify-center">
          <ToggleSidebarButton
            className="hover:bg-secondary hover:text-secondary-foreground"
            variant={{ variant: "outline" }}
          />
        </div>
      </header>

      {/* Form */}
      <form
        className="mt-6"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <div className="my-4">
              <input
                {...field}
                className={`${
                  fieldState?.error
                    ? "text-destructive underline focus:bg-destructive/10"
                    : "focus:bg-secondary"
                } hover:p-4 hover:bg-secondary hover:rounded-md focus:rounded-md focus:p-4 cursor-pointer focus:cursor-text transition-all duration-300 focus:scale-100 text-4xl outline-none font-header uppercase w-full`}
                placeholder="Organization Name"
                autoComplete="off"
              />
              <p
                className={`${
                  fieldState?.error ? "block" : "hidden"
                } text-destructive font-light text-xs mt-0.5`}
              >
                {fieldState?.error?.message}
              </p>
            </div>
          )}
        />

        <div className="mt-4 grid md:grid-cols-[auto_240px] gap-4">
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <div>
                <textarea
                  {...field}
                  className={`outline-none focus:p-4 focus:bg-secondary transition-all duration-300 py-2 w-full field-sizing-content rounded-md h-48`}
                  placeholder="Description"
                  rows={5}
                />
                <p
                  className={`${
                    fieldState?.error ? "block" : "hidden"
                  } text-destructive font-light text-xs mt-0.5`}
                >
                  {fieldState?.error?.message}
                </p>
              </div>
            )}
          />

          {/* Logo */}
          <div className="flex">
            {/* Placeholder */}
            <button
              type="button"
              className="w-full min-h-48 max-h-48 cursor-pointer active:scale-95 transition-all duration-300 bg-secondary rounded-md flex flex-col items-center justify-center"
            >
              <ImageUp />
              <span className="text-sm font-light">Upload logo</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant={"outline"} asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" disabled={!isValid}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewOrganizationIndex;
