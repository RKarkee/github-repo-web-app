import Home from "@/features/home";
import AppLayout from "@/layouts";
import { createBrowserRouter } from "react-router-dom";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);
