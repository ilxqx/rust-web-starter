/// <reference types="vite/client" />

import type { DefaultMantineSize } from "@mantine/core";

type Shadows = "box-sm" | "box-md" | "box-lg" | DefaultMantineSize;

type Spacings = "xxs" | "xxl" | DefaultMantineSize;

type Radii = "xxs" | "xxl" | "full" | DefaultMantineSize;

type LineHeights = "none" | "xxs" | "xxl" | DefaultMantineSize;

type Easings = "ease-in" | "ease-out" | "ease-in-out" | "ease-in-smooth";

type Animations = "spin" | "ping" | "pulse" | "bounce";

type Durations = "fastest" | "faster" | "fast" | "moderate" | "slow" | "slower" | "slowest";

type Blurs = "xxs" | "xxl" | DefaultMantineSize;

type LetterSpacings = DefaultMantineSize;

type AspectRatios = "square" | "landscape" | "portrait" | "wide" | "ultrawide" | "golden";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    easings: Record<Easings, string>;
    animations: Record<Animations, string>;
    durations: Record<Durations, string>;
    blurs: Record<Blurs, string>;
    letterSpacings: Record<LetterSpacings, string>;
    aspectRatios: Record<AspectRatios, string>;
    border: string;
  }

  export interface MantineThemeSizesOverride {
    shadows: Record<Shadows, string>;
    radius: Record<Radii, string>;
    spacing: Record<Spacings, string>;
    lineHeights: Record<LineHeights, string>;
  }
}
