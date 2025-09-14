"use client";

import { COOLDOWN_TIME_MS } from "@/src/lib/configs/app";
import { fetchEmailInfo } from "@/src/lib/fetchers/fetchEmailInfo";
import { profileSchema } from "@/src/lib/zodSchema/profileSchema";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormData {
  email: string;
}

const RecoveryPageIndex = () => {
  // State for email key and typing
  const [emailKey, setEmailKey] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Added for mutation error handling

  // Form setup
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema.pick({ email: true })),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  // Query to fetch email info
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["email", emailKey],
    queryFn: () => fetchEmailInfo(emailKey),
    enabled: emailKey.length > 3 && isValid && !isTyping,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  // Debounce email input
  useEffect(() => {
    setIsTyping(true);
    const debouncer = setTimeout(() => {
      setIsTyping(false);
      setEmailKey(email);
    }, 700);

    return () => clearTimeout(debouncer);
  }, [email]);

  // Update account based on query data
  useEffect(() => {
    if (data?.email) {
      setAccount(data.email);
    } else {
      setAccount(null);
    }
  }, [data]);

  // Cooldown logic
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = useCallback(() => {
    if (!data?.recoverySentAt) return 0;

    const lastRecovery = new Date(data.recoverySentAt);
    const cooldownEnd = lastRecovery.getTime() + COOLDOWN_TIME_MS;
    const now = new Date();
    const timeLeft = cooldownEnd - now.getTime();
    return timeLeft > 0 ? timeLeft : 0;
  }, [data]);

  // Initialize and update cooldown timer
  useEffect(() => {
    if (!data?.recoverySentAt) return;

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, calculateTimeLeft]);

  // Format cooldown time for display
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const isCooldownPassed = timeLeft === 0 && !!data?.email;

  // Mutation for resending recovery email
  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/users/email/resend", {
        method: "POST",
        body: JSON.stringify({ email, type: "reset_password" }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to send recovery email");
      }
      return result;
    },
    onError: (error: Error) => {
      setError(error.message); // Display mutation error to user
    },
    onSuccess: () => {
      setError(null); // Clear error on success
      refetch(); // Refetch to update recoverySentAt
    },
  });

  // Form submission handler
  const onSubmit = useCallback(() => {
    if (emailKey.length < 4 || !isValid || isTyping || isFetching || !account) {
      return;
    }
    mutate(account);
  }, [emailKey, isValid, isTyping, isFetching, account, mutate]);

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <input
                {...field}
                className={`border rounded-md px-4 py-2 w-full ${
                  fieldState?.error
                    ? "border-destructive outline-destructive"
                    : ""
                }`}
                placeholder="Enter your email"
                aria-label="Email address"
                aria-describedby={fieldState?.error ? "email-error" : undefined}
              />
              {/* Form validation error */}
              {fieldState?.error && (
                <p
                  id="email-error"
                  className="text-destructive font-light text-xs"
                >
                  {fieldState.error.message}
                </p>
              )}
              {/* Processing email */}
              {emailKey.length > 3 && isValid && isFetching && (
                <p className="text-yellow-700 font-light text-xs">
                  Checking email...
                </p>
              )}
              {/* Email not found */}
              {emailKey.length > 3 && isValid && !isFetching && !account && (
                <p className="text-destructive font-light text-xs">
                  No account found with this email.
                </p>
              )}
              {/* Mutation error */}
              {error && (
                <p className="text-destructive font-light text-xs">{error}</p>
              )}
            </div>
          )}
        />
        {!isCooldownPassed &&
        timeLeft > 0 &&
        data?.recoverySentAt &&
        account ? (
          <Button className="w-full mt-4" type="button" disabled>
            <LoaderCircle className="animate-spin mr-2" />
            {minutes}:{seconds.toString().padStart(2, "0")}
          </Button>
        ) : (
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={
              !isValid || isTyping || isFetching || isMutating || !account
            }
          >
            {isFetching || isMutating ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Reset My Password"
            )}
          </Button>
        )}
      </form>
    </div>
  );
};

export default RecoveryPageIndex;
