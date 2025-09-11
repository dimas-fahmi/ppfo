import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./useSession";
import { fetchUserProfile } from "../fetchers/fetchUserProfile";
import { useEffect } from "react";
import { createClient } from "../supabase/utils/client";

export const useProfile = () => {
  // Init
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Get Session
  const { data: session } = useSession();
  const id = session?.session?.user.id;

  // Query
  const query = useQuery({
    queryKey: ["auth", "session", "profile"],
    queryFn: () => (id ? fetchUserProfile(id) : null),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(["auth", "session"], session ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  return query.data?.result;
};
