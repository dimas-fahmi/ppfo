import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../supabase/utils/client";
import { User } from "@supabase/supabase-js";
import { OurUserMetadata } from "../types/Supabase";

interface OurUser extends Omit<User, "user_metadata"> {
  user_metadata: OurUserMetadata;
}

export const getUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user as OurUser;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: getUser,
    staleTime: 0, // force fresh
    refetchOnWindowFocus: false,
  });
};

export const useMutateUser = () => {
  const { data, refetch } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: { data: OurUserMetadata }) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.updateUser(req);

      if (error) {
        throw error;
      }

      return data;
    },
    onMutate: (mutateData) => {
      queryClient.cancelQueries({
        queryKey: ["auth", "user"],
      });

      const oldData = data;

      if (oldData) {
        queryClient.setQueryData(["auth", "users"], () => {
          const newData: OurUser = {
            ...oldData,
            user_metadata: { ...oldData, ...mutateData?.data },
          };

          return newData;
        });
      }

      return { oldData };
    },
    onError: (_err, _, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(["auth", "users"], context.oldData);
      }
    },
    onSettled: () => {
      refetch();
    },
  });
};
