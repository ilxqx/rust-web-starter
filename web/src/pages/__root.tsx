import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Error, LoadingPlaceholder, NotFound } from "../components";

export const Route = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ({ error }) => <Error error={error.message} />,
  notFoundComponent: () => <NotFound />,
  pendingComponent: () => <LoadingPlaceholder />,
  ssr: false,
});
