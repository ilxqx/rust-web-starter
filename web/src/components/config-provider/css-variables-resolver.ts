import type { ConvertCSSVariablesInput, MantineTheme } from "@mantine/core";

import { keys } from "@mantine/core";

/**
 * Resolve extended CSS variables.
 *
 * @param theme - Mantine theme
 * @returns CSS variables
 */
export function cssVariablesResolver(theme: MantineTheme) {
  const result: ConvertCSSVariablesInput = {
    variables: {
      "--mantine-font-size-root": "16px",
      "--mantine-border": theme.other.border,
    },
    light: {
      "--mantine-color-default-border": "var(--mantine-color-gray-3)",
    },
    dark: {
      "--mantine-color-default-border": "var(--mantine-color-dark-5)",
    },
  };

  for (const key of keys(theme.other.easings)) {
    result.variables[`--mantine-easing-${key}`] = theme.other.easings[key];
  }

  for (const key of keys(theme.other.animations)) {
    result.variables[`--mantine-animation-${key}`] = theme.other.animations[key];
  }

  for (const key of keys(theme.other.durations)) {
    result.variables[`--mantine-duration-${key}`] = theme.other.durations[key];
  }

  for (const key of keys(theme.other.letterSpacings)) {
    result.variables[`--mantine-letter-spacing-${key}`] = theme.other.letterSpacings[key];
  }

  for (const key of keys(theme.other.blurs)) {
    result.variables[`--mantine-blur-${key}`] = theme.other.blurs[key];
  }

  for (const key of keys(theme.other.aspectRatios)) {
    result.variables[`--mantine-aspect-ratio-${key}`] = theme.other.aspectRatios[key];
  }

  return result;
}
