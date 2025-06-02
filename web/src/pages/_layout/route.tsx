import {Button, Group, Stack, Title} from "@mantine/core";
import {createFileRoute, Outlet, redirect, useRouter} from "@tanstack/react-router";

import { getUserInfo, queryClient } from "../../apis";
import { LoadingPlaceholder } from "../../components";
import { useAppStore } from "../../stores";

export const Route = createFileRoute("/_layout")({
  component: Layout,
  pendingComponent: () => <LoadingPlaceholder />,
  staleTime: Infinity,
  shouldReload: false,
  beforeLoad({ location }) {
    const { isAuthenticated } = useAppStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  async loader() {
    const userInfo = await queryClient.fetchQuery({
      queryKey: ["user-info"],
      queryFn: () => getUserInfo(),
    });
    useAppStore.setState(state => {
      return {
        ...state,
        userInfo: Object.freeze(userInfo),
      };
    });
  },
});

function Layout() {
  const router = useRouter();

  return (
    <Stack h="100%" p="xxl">
      <Group justify="space-between">
        <Title c="blue" flex="none">Rust Axum Admin</Title>
        <Button variant="subtle" onClick={() => {
          useAppStore.setState(() => {
            return {
              isAuthenticated: false,
            }
          })

          router.invalidate();
          router.navigate({
            to: "/login"
          })
        }}>
          退出登录
        </Button>
      </Group>
      <Outlet />
    </Stack>
  );
}
