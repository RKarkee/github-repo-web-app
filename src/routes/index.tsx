import { createBrowserRouter } from "react-router-dom";
import Home from "../features/home";
import RepositoryDetail from "../features/repository";
import AppLayout from "../layouts";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "repository/:owner/:repo",
        element: <RepositoryDetail />,
      },
    ],
  },
]);
