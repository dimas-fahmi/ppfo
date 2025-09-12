import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./useSession";
import { fetchUserProfile } from "../fetchers/fetchUserProfile";
import { useEffect } from "react";
import { createClient } from "../supabase/utils/client";
import { mutateProfile } from "../mutators/mutateProfile";
import { UsersProfile } from "@/app/api/users/profiles/get";

export const useProfile = () => {
  // Init
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Get Session
  const { data: session } = useSession();
  const id = session?.user.id;

  // Query
  const query = useQuery({
    queryKey: ["auth", "session", "profile"],
    queryFn: () => fetchUserProfile(id!),
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
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      query.refetch();
    });

    return () => subscription.unsubscribe();
  }, [supabase, queryClient, query]);

  return query;
};

export const useProfileMutate = () => {
  const queryClient = useQueryClient();
  const { data, refetch } = useProfile();

  return useMutation({
    mutationFn: mutateProfile,
    onMutate: (newData) => {
      queryClient.cancelQueries({
        queryKey: ["auth", "session", "profile"],
      });

      const lastData = data;

      if (lastData) {
        queryClient.setQueryData(["auth", "session", "profile"], () => {
          const n: UsersProfile = {
            ...lastData,
            ...newData.newValues,
          };

          return n;
        });
      }

      return { lastData };
    },
    onError: (_err, _newData, context) => {
      if (context?.lastData) {
        queryClient.setQueryData(
          ["auth", "session", "profile"],
          context.lastData
        );
      }
    },
    onSettled: () => {
      refetch();
    },
  });
};
