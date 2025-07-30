import Home from "@/features/home";
import RepositoryDetail from "@/features/repository";
import AppLayout from "@/layouts";
import { createBrowserRouter } from "react-router-dom";

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
