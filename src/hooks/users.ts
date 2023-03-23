import { useMutation, useQuery } from "react-query";
import { instance } from "../utils/instance";

// FETCH USER DATA FROM SERVER
export const fetchUsers = async () => {
  return await instance({ url: `/users`, method: "GET" });
};

// FETCH USER DATA HOOK
export const useFetchUsersData = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["users"],
    () => fetchUsers(),
    {
      onSuccess: (data) => {},
    }
  );
  const usersData = data;
  return { usersData, isLoading, isError, refetch, isFetching };
};

// DELETE USER DATA HOOK
export const useDeleteUserData = () => {
  const userDelete = useMutation(
    (id: string) => {
      return instance({
        url: `users/${id}`,
        method: "DELETE",
        data: id,
      });
    },
    {
      onSuccess: (data) => {
        // toast.success(data.data.success);
      },
      onError: (error: any) => {
        // toast.error(error?.response?.data?.message);
      },
    }
  );

  return { userDelete };
};