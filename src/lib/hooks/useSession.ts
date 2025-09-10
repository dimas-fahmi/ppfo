import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";
import { useEffect } from "react";

export const getSession = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data;
};

export const useSession = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: getSession,
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
  }, [queryClient, supabase]);

  return sessionQuery;
};
