import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { motion } from "motion/react";

type SpecialInput<T extends FieldValues> = {
  control: Control<T>;
  name: keyof T;
  label: string;
  dropContent?: React.ReactNode;
  placeholder: string;
};

// Special Input
export const SpecialInput = <T extends FieldValues>({
  control,
  name,
  label,
  dropContent,
  placeholder,
}: SpecialInput<T>) => {
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => (
        <div className="mt-4 space-y-1">
          <h3 className="font-semibold">{label}</h3>
          {/* Input */}

          <input
            className={`${
              placeholder !== "optional" && field?.value?.length < 1
                ? "bg-destructive/10"
                : "bg-primary text-primary-foreground"
            } ${
              placeholder === "optional" ? "" : "placeholder:text-destructive"
            } p-2 w-full text-xs cursor-pointer focus:cursor-text flex items-center`}
            {...field}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlurCapture={() => setFocus(false)}
            autoComplete="off"
          />

          {fieldState?.error && (
            <p className="text-xs text-destructive font-light">
              {fieldState.error.message}
            </p>
          )}

          <motion.div
            initial={{ height: 0 }}
            animate={focus && dropContent ? { height: "auto" } : { height: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            {/* Container */}
            <div className="p-4 border-dashed border text-xs font-light mt-2">
              {dropContent}
            </div>
          </motion.div>
        </div>
      )}
    />
  );
};
