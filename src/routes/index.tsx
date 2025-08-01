import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts";
import PageLoader from "../common/fallback";
import { HomePage, RepositoryDetail } from "../common/AsyncComponent";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/repository/:owner/:repo",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RepositoryDetail />
          </Suspense>
        ),
      },
    ],
  },
]);
