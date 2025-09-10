import { createBrowserClient } from "@supabase/ssr";

/**
 * @returns A Supabase client instance for browser-side operations.
 * @throws Will throw an error if the required environment variables are not set.
 */
export function createClient() {
  // Ensure the environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_ID
  ) {
    throw new Error("Missing Supabase environment variables");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_ID
  );
}
