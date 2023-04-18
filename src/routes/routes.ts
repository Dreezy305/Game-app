import { lazy } from "react";

const Users = lazy(() => import("../pages/users/users"));
const User = lazy(() => import("../pages/users/overview/singleUser"));
const AddUser = lazy(() => import("../pages/users/overview/addUser"));
const Games = lazy(() => import("../pages/games/games"));
const Game = lazy(() => import("../pages/games/overview/singleGame"));
const AddGame = lazy(() => import("../pages/games/overview/addGame"));

export const dashboardRoutes = [
  { path: "/users", component: Users },
  { path: "/users/:id", component: User },
  { path: "/add-new-user", component: AddUser },
  { path: "/games", component: Games },
  { path: "/games/:id", component: Game },
  { path: "/add-new-game", component: AddGame },
];
