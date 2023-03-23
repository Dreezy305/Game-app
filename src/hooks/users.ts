import { useQuery } from "react-query";
import { instance } from "../utils/instance";

// FETCH USER DATA FROM SERVER
export const fetchUsers = async () => {
  return await instance({ url: `/users`, method: "GET" });
};

// FETCH USER DATA HOOKS
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
