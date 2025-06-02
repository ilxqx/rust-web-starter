import { Center, Title } from "@mantine/core";

export function Error({ error }: { error: string }) {
  return (
    <Center h="100%">
      <Title c="red">{error}</Title>
    </Center>
  );
}
