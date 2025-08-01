import { lazy } from "react";

const HomePage = lazy(() => import("../features/home"));
const RepositoryDetail = lazy(
  () => import("../features/repository/repositoryDetail/RepositoryDetail")
);

export { HomePage, RepositoryDetail };
