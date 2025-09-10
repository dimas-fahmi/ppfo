import { createServiceClient } from "@/src/lib/supabase/utils/service";
import { NextRequest, NextResponse } from "next/server";

export async function usersGet(request: NextRequest) {
  // Initialize Supabase Client
  const supabase = await createServiceClient();

  // Extract Query Parameters
  const url = request.nextUrl;
  const { email } = Object.fromEntries(url.searchParams.entries());

  try {
    let query = supabase.from("auth.users").select("*"); // 👈 can narrow fields if needed

    if (email) {
      query = query.eq("email", email);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
