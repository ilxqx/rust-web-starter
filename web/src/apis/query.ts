import { showNotification } from "@mantine/notifications";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: false,
    },
    mutations: {
      throwOnError: false,
      onError(error) {
        showNotification({
          color: "red",
          title: "错误",
          message: error.message,
        });
      },
    },
  },
});
