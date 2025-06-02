import { Loader, Stack } from "@mantine/core";

import type { LoadingPlaceholderProps } from "./props";

export function LoadingPlaceholder({
  size,
}: LoadingPlaceholderProps) {
  return (
    <Stack align="center" gap="lg" h="100%" justify="center">
      <Loader size={size} />
    </Stack>
  );
}
