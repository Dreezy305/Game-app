/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../utils/instance";
import { addGamePayload } from "../utils/interfaces";

// FETCH GAME DATA FROM SERVER
export const fetchGames = async (query: string) => {
  if (query === "") {
    return await instance({ url: `/games`, method: "GET" });
  } else {
    return await instance({ url: `/games${query}`, method: "GET" });
  }
};

// FETCH SINGLE GAME DATA
export const fetchGame = async (id: string) => {
  return await instance({ url: `/games/${id}`, method: "GET" });
};

// FETCH USER DATA HOOK
export const useFetchGamesData = (query: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["games", query],
    () => fetchGames(query),
    {
      onSuccess: (data) => {},
    }
  );
  const gamesData = data;
  return { gamesData, isLoading, isError, refetch, isFetching };
};

// FETCH GAME DATA HOOK
export const useFetchGameData = (id: string) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ["single-game", id],
    () => fetchGame(id),
    {
      onSuccess: (data) => {},
    }
  );
  const gameData = data;
  return { gameData, isLoading, isError, refetch, isFetching };
};

// DELETE GAME DATA HOOK
export const useDeleteGameData = () => {
  const gameDelete = useMutation(
    (id: string) => {
      return instance({
        url: `games/${id}`,
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
        toast.error(`An error occured while deleting this game`, {
          theme: "colored",
          type: "error",
        });
      },
    }
  );

  return { gameDelete };
};

// ADD NEW GAME HOOK
export const useAddGame = () => {
  const gameCreate = useMutation(
    (gameData: addGamePayload) => {
      return instance({
        url: `games`,
        method: "POST",
        data: gameData,
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
        toast.error(`There was an error while creating this game`, {
          theme: "colored",
          type: "error",
        });
      },
    }
  );
  return { gameCreate };
};
