import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: [
    "@commitlint/config-conventional",
  ],
  formatter: "@commitlint/format",
};

export default config;
