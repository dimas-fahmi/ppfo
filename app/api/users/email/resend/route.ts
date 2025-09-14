import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { UsersEmailInfo } from "../info/get";
import { createClient } from "@/src/lib/supabase/utils/server";
import { AuthError } from "@supabase/supabase-js";
import { createResponse } from "@/src/lib/utils/createResponse";

const PATH = "API_USERS_EMAIL_RESEND" as const;

export async function POST(request: NextRequest) {
  let body: { email: string; type: "signup" | "reset_password" | "OTP" };

  // Parse
  try {
    body = await request.json();

    if (!body.email || !body.type) {
      return createResponse(
        400,
        "bad_request",
        "MISSING_EMAIL_OR_TYPE_PARAMETERS",
        undefined,
        true,
        PATH
      );
    }
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      "INVALID_JSON_BODY",
      undefined,
      true,
      PATH
    );
  }

  // Validate Email
  const validation = z.email().safeParse(body.email);

  if (!validation.success) {
    return createResponse(
      400,
      "bad_request",
      "INVALID_EMAIL",
      undefined,
      true,
      PATH
    );
  }

  // Fetch Email Information
  const url = new URL(request.nextUrl);
  const emailInfoResponse = await fetch(
    `${url.origin}/api/users/email/info?email=${validation.data}`
  );
  const result = (await emailInfoResponse.json()) as UsersEmailInfo;

  if (!emailInfoResponse.ok) {
    return NextResponse.json({ result }, { status: 500 });
  }

  if (result.emailConfirmedAt && body.type === "signup") {
    console.log("ALREADY_CONFIRMED");
    return NextResponse.json({ error: "ALREADY_CONFIRMED" }, { status: 400 });
  }

  // Cooldown Check
  const cooldown = 5 * 60 * 1000;
  const now = new Date();
  const lastVerification = result?.confirmationSentAt
    ? new Date(result.confirmationSentAt)
    : null;
  const lastRecovery = result?.recoverySentAt
    ? new Date(result.recoverySentAt)
    : null;

  const isPassedCooldown = lastVerification
    ? now.getTime() - lastVerification.getTime() > cooldown
    : true;

  const isPassedCooldownRecovery = lastRecovery
    ? now.getTime() - lastRecovery.getTime() > cooldown
    : true;

  if (!isPassedCooldown && body.type === "signup") {
    return createResponse(
      429,
      "too_many_request",
      "NOT_YET_PASSED_COOLDOWN",
      undefined,
      true,
      PATH
    );
  }

  if (!isPassedCooldownRecovery && body.type === "reset_password") {
    return createResponse(
      429,
      "too_many_request",
      "NOT_YET_PASSED_COOLDOWN",
      undefined,
      true,
      PATH
    );
  }

  // Prevent other operations than "signUp" & "reset_password" for now
  if (body.type !== "signup" && body.type !== "reset_password") {
    return NextResponse.json(
      { error: "ABORTED_NOT_YET_IMPLEMENTED" },
      { status: 403 }
    );
  }

  // Execute
  try {
    const supabase = await createClient();
    let error: AuthError | null = null;
    if (
      ["signup", "email_change", "phone_change", "sms"].includes(body.type) &&
      body.type !== "reset_password"
    ) {
      const r = await supabase.auth.resend({
        type: body.type,
        email: body.email,
      });
      error = r?.error;
    }

    if (body.type === "reset_password") {
      const r = await supabase.auth.resetPasswordForEmail(body.email, {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppfo.dimasfahmi.pro"
        }/auth/recovery/confirmed`,
      });
      error = r?.error;
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    return createResponse(
      (error as AuthError)?.status ?? 500,
      (error as AuthError)?.code ?? "unknown_error",
      (error as AuthError)?.message ?? "Unknwon error",
      undefined
    );
  }

  return createResponse(
    200,
    "success",
    `${body?.type} sent to ${body?.email}`,
    undefined
  );
}
