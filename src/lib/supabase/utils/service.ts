import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 *
 * @description Creates a Supabase client instance for server-side operations using the service role key. This client has elevated privileges and should be used with caution. Prefer using server/client with publishable key for most operations to ensure security.
 *
 * @returns A Supabase client instance for server-side operations using the service role key.
 * @throws Will throw an error if the required environment variables are not set.
 */
export async function createServiceClient() {
  const cookieStore = await cookies();

  // Ensure the environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SECRET_SERVICE_ROLE_KEY
  ) {
    throw new Error("Missing Supabase environment variables");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SECRET_SERVICE_ROLE_KEY,
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
