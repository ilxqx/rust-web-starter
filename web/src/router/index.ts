import { createBrowserHistory, createRouter } from "@tanstack/react-router";

import { routeTree } from "./router.gen";

export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
