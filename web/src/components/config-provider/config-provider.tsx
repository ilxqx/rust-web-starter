import type { DatesProviderProps } from "@mantine/dates";
import type { ModalsProviderProps } from "@mantine/modals";
import type { PropsWithChildren } from "react";

import { localStorageColorSchemeManager, MantineProvider, ScrollArea } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import "dayjs/locale/zh-cn";

import { cssVariablesResolver } from "./css-variables-resolver";
import { themeOverride } from "./theme";

const colorSchemaManager = localStorageColorSchemeManager({
  key: "__VEF_APP_COLOR_SCHEMA__",
});
const modalSettings: ModalsProviderProps["modalProps"] = {
  centered: true,
  scrollAreaComponent: ScrollArea,
};
const datePickerSettings: DatesProviderProps["settings"] = {
  locale: "zh-CN",
};

export function ConfigProvider({ children }: PropsWithChildren) {
  return (
    <MantineProvider
      deduplicateCssVariables
      withCssVariables
      withGlobalClasses
      colorSchemeManager={colorSchemaManager}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="light"
      env="default"
      theme={themeOverride}
      withStaticClasses={false}
    >
      <NavigationProgress />

      <Notifications
        containerWidth={360}
        limit={3}
        position="top-right"
      />

      <ModalsProvider modalProps={modalSettings}>
        <DatesProvider settings={datePickerSettings}>
          {children}
        </DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
