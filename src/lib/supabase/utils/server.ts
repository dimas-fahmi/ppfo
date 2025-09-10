import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * @returns A Supabase client instance for server-side operations.
 * @throws Will throw an error if the required environment variables are not set.
 */
export async function createClient() {
  const cookieStore = await cookies();

  // Ensure the environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_ID
  ) {
    throw new Error("SUPABASE_CONNECTION_INVALID_OR_UNAVAILABLE");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_ID,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
