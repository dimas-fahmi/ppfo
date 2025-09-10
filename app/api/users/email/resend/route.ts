import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { UsersEmailInfo } from "../info/get";
import { createClient } from "@/src/lib/supabase/utils/server";

export async function POST(request: NextRequest) {
  let body: { email: string; type: "signup" | "OTP" };

  // Parse
  try {
    body = await request.json();

    if (!body.email || !body.type) {
      console.log("MISSING_EMAIL_OR_TYPE_PARAMETERS");
      return NextResponse.json(
        { error: "MISSING_EMAIL_OR_TYPE_PARAMETERS" },
        { status: 400 }
      );
    }
  } catch (_error) {
    console.log("INVALID_JSON_BODY");
    return NextResponse.json({ error: "INVALID_JSON_BODY" }, { status: 400 });
  }

  // Validate Email
  const validation = z.email().safeParse(body.email);

  if (!validation.success) {
    console.log("INVALID_EMAIL");
    return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
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

  const isPassedCooldown = lastVerification
    ? now.getTime() - lastVerification.getTime() > cooldown
    : true;

  if (!isPassedCooldown) {
    return NextResponse.json(
      { error: "NOT_YET_PASSED_COOLDOWN" },
      { status: 403 }
    );
  }

  // Prevent other operations than "signUp" for now
  if (body.type !== "signup") {
    return NextResponse.json(
      { error: "ABORTED_NOT_YET_IMPLEMENTED" },
      { status: 403 }
    );
  }

  // Execute
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: body.type,
      email: body.email,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/email/confirmed?email=${body.email}&`,
      },
    });

    if (error) {
      throw error;
    }
  } catch (_error) {
    return NextResponse.json({ _error }, { status: 500 });
  }

  return NextResponse.json(
    { result: "success", message: `Email sent to ${body.email}` },
    { status: 200 }
  );
}
