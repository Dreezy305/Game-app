/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../utils/instance";

// FETCH GAME DATA FROM SERVER
export const fetchGames = async (query: string) => {
  if (query === "") {
    return await instance({ url: `/games`, method: "GET" });
  } else {
    return await instance({ url: `/games${query}`, method: "GET" });
  }
};

// FETCH USER DATA HOOK
export const useFetchGamesData = (query: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["users", query],
    () => fetchGames(query),
    {
      onSuccess: (data) => {},
    }
  );
  const gamesData = data;
  return { gamesData, isLoading, isError, refetch, isFetching };
};
