import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type ControllerInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: keyof T;
  placeholder: string;
};

const ControllerInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
}: ControllerInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => (
        <div>
          <input
            {...field}
            className={`${
              fieldState?.error ? "border-destructive outline-destructive" : ""
            } border rounded-md px-4 py-2 w-full`}
            placeholder={placeholder}
            autoComplete="off"
          />
          <p
            className={`${
              fieldState?.error ? "block" : "hidden"
            } text-destructive font-light text-xs mt-0.5`}
          >
            {fieldState.error?.message}
          </p>
        </div>
      )}
    />
  );
};

export default ControllerInput;
