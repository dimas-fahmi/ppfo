"use client";

import { fetchEmailInfo } from "@/src/lib/fetchers/fetchEmailInfo";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const COOLDOWN_TIME_MS = 5 * 60 * 1000; // 5 minutes

const EmailVerificationIndex = () => {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");

  useEffect(() => {
    if (!email) {
      router.replace("/auth");
    }
  }, [email, router]);

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["email", "info", email],
    queryFn: () => fetchEmailInfo(email!),
    enabled: !!email,
  });

  useEffect(() => {
    if (error) {
      alert(`${email} is not exist on our database`);
      router.push("/");
    }
    if (data?.emailConfirmedAt) {
      router.push(`/auth/email/confirmed?email=${email}`);
    }
  }, [data, router, error, email]);

  const lastVerification = useMemo(() => {
    return data?.confirmationSentAt ? new Date(data.confirmationSentAt) : null;
  }, [data?.confirmationSentAt]);

  const cooldownEnd = lastVerification
    ? lastVerification.getTime() + COOLDOWN_TIME_MS
    : 0;

  const calculateTimeLeft = useCallback(() => {
    // Don't calculate if data is not loaded yet
    if (!data || !lastVerification) return 0;

    const now = Date.now();
    const timeLeft = cooldownEnd - now;
    return timeLeft > 0 ? timeLeft : 0;
  }, [cooldownEnd, data, lastVerification]);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Initialize timeLeft when data is loaded
  useEffect(() => {
    if (data && lastVerification) {
      setTimeLeft(calculateTimeLeft());
    }
  }, [data, lastVerification, calculateTimeLeft]);

  useEffect(() => {
    if (!data || !lastVerification) return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Clear interval when countdown reaches 0
      if (newTimeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, lastVerification, timeLeft, calculateTimeLeft]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const isCooldownPassed = timeLeft === 0 && !!data;

  const queryClient = useQueryClient();

  // Mutate
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/users/email/resend", {
        method: "POST",
        body: JSON.stringify({ email: email, type: "signup" }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }

      return result;
    },
    onMutate: () => {
      queryClient.setQueryData(["email", "info", email], null);
    },
    onSettled: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="max-w-md p-4 overflow-y-scroll scrollbar-none h-full max-h-dvh">
      <div className="mb-4">
        <Image
          width={90}
          height={90}
          src={"/resources/ppfo/logos/circular.png"}
          alt="ppfo logo"
          className="w-24"
        />
      </div>

      <header className="mb-4">
        <h1 className="font-header text-3xl font-black mb-2">
          THANK YOU FOR JOINING US, IMPORTANT STEP!
        </h1>
        <p className="font-light">
          We need you to confirm that you have access to this email
        </p>
        <span className="flex items-center text-sm px-4 py-2 mt-2 justify-center gap-2 rounded-md font-semibold">
          <span className="text-yellow-700">{email}</span>
          <Loader className="animate-spin w-4 h-4 opacity-50" />
        </span>
      </header>

      <Button
        className="w-full mb-4"
        type="submit"
        disabled={!isCooldownPassed || isLoading}
        onClick={() => {
          if (!isCooldownPassed || isLoading) return;

          mutate();
        }}
      >
        <span className="flex items-center gap-2">
          {isFetching && !data ? (
            <>
              <LoaderCircle className="animate-spin" />
              Wait a moment
            </>
          ) : !isFetching ? (
            isCooldownPassed ? (
              <>Resend Verification Email</>
            ) : (
              <>
                <LoaderCircle className="animate-spin" />
                {minutes}:{seconds.toString().padStart(2, "0")}
              </>
            )
          ) : null}
        </span>
      </Button>

      <div className="text-sm flex justify-between items-center">
        <Link
          href={"/"}
          prefetch
          className="flex hover:underline items-center gap-2"
        >
          <ArrowLeft />
          Homepage
        </Link>
        <Link
          href={"/auth"}
          prefetch
          className="flex hover:underline items-center gap-2"
        >
          Sign In
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationIndex;
