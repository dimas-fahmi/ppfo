import { createServiceClient } from "@/src/lib/supabase/utils/service";
import { NextRequest, NextResponse } from "next/server";

export interface UsersEmailInfo {
  id: string;
  email: string;
  emailConfirmedAt: string | null;
  confirmationSentAt: string | null;
  recoverySentAt: string | null;
}

export async function usersEmailInfoGet(request: NextRequest) {
  const url = request.nextUrl;
  const { email } = Object.fromEntries(url.searchParams.entries());

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase.rpc("get_user_by_email", {
      p_email: email,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    const result: UsersEmailInfo = {
      id: data[0]?.id,
      confirmationSentAt: data[0]?.confirmation_sent_at,
      emailConfirmedAt: data[0]?.email_confirmed_at,
      email: data[0]?.email,
      recoverySentAt: data[0]?.recovery_sent_at,
    };

    if (!result?.email) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
