import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../utils/instance";
import { userEditPayload } from "../utils/interfaces";

// FETCH USER DATA FROM SERVER
export const fetchUsers = async (query: string) => {
  if (query === "") {
    return await instance({ url: `/users`, method: "GET" });
  } else {
    return await instance({ url: `/users${query}`, method: "GET" });
  }
};

// FETCH SINGLE USER DATA
export const fetchUser = async (id: string) => {
  return await instance({ url: `/users/${id}`, method: "GET" });
};

// FETCH USER DATA HOOK
export const useFetchUsersData = (query: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["users", query],
    () => fetchUsers(query),
    {
      onSuccess: (data) => {},
    }
  );
  const usersData = data;
  return { usersData, isLoading, isError, refetch, isFetching };
};

// FETCH SINGLE USER DATA HOOK
export const useFetchUserData = (id: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["single-user", id],
    () => fetchUser(id),
    {
      onSuccess: (data) => {},
    }
  );
  const userData = data;
  return { userData, isLoading, isError, refetch, isFetching };
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
        toast.success(`${data?.data?.name} deleted successfully`, {
          theme: "colored",
          type: "success",
        });
      },
      onError: (error: any) => {
        // toast.error(error?.response?.data?.message);
      },
    }
  );

  return { userDelete };
};

// EDIT USER DATA HOOK
export const useEditUser = (id: any) => {
  const userEdit = useMutation(
    (userData: userEditPayload) => {
      return instance({
        url: `users/${id}`,
        method: "PUT",
        data: userData,
      });
    },
    {
      onSuccess: (data) => {
        toast.success(`${data?.data?.name} edited successfully`, {
          theme: "colored",
          type: "success",
        });
      },
      onError: (error: any) => {
        // toast.error(error?.response?.data);
      },
    }
  );
  return { userEdit };
};

// ADD NEW USER HOOK
export const useAddUser = () => {
  const userEdit = useMutation(
    (userData: userEditPayload) => {
      return instance({
        url: `users`,
        method: "POST",
        data: userData,
      });
    },
    {
      onSuccess: (data) => {
        toast.success(`${data?.data?.name} added successfully`, {
          theme: "colored",
          type: "success",
        });
      },
      onError: (error: any) => {
        // toast.error(error?.response?.data);
      },
    }
  );
  return { userEdit };
};
