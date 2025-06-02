import { createTheme, DEFAULT_THEME, mergeMantineTheme, Modal, Notification, rem, ScrollArea, Select, Tooltip } from "@mantine/core";

export const themeOverride = createTheme({
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#ffffff",
  black: "#000000",
  cursorType: "pointer",
  respectReducedMotion: true,
  radius: {
    xxs: rem(2),
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
    xxl: rem(32),
    full: rem(999),
  },
  lineHeights: {
    none: "1",
    xxs: "1.125",
    xs: "1.25",
    sm: "1.375",
    md: "1.5",
    lg: "1.625",
    xl: "1.75",
    xxl: "2",
  },
  spacing: {
    xxs: rem(4),
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(24),
    xxl: rem(32),
  },
  shadows: {
    "box-sm": `0 0 ${rem(5)} 0 rgba(0, 0, 0, .02), 0 ${rem(2)} ${rem(10)} 0 rgba(0, 0, 0, .06), 0 0 ${rem(1)} 0 rgba(0, 0, 0, .2)`,
    "box-md": `0 0 ${rem(15)} 0 rgba(0, 0, 0, .03), 0 ${rem(2)} ${rem(30)} 0 rgba(0, 0, 0, .08), 0 0 ${rem(1)} 0 rgba(0, 0, 0, .2)`,
    "box-lg": `0 0 ${rem(30)} 0 rgba(0, 0, 0, .04), 0 ${rem(60)} ${rem(60)} 0 rgba(0, 0, 0, .12), 0 0 ${rem(1)} 0 rgba(0, 0, 0, .2)`,
  },
  other: {
    easings: {
      "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
      "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      "ease-in-smooth": "cubic-bezier(0.32, 0.72, 0, 1)",
    },
    animations: {
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    durations: {
      fastest: "50ms",
      faster: "100ms",
      fast: "150ms",
      moderate: "200ms",
      slow: "300ms",
      slower: "400ms",
      slowest: "500ms",
    },
    blurs: {
      xxs: "2px",
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      xxl: "32px",
    },
    letterSpacings: {
      xs: "-0.05em",
      sm: "-0.025em",
      md: "0.025em",
      lg: "0.05em",
      xl: "0.1em",
    },
    aspectRatios: {
      square: "1 / 1",
      landscape: "4 / 3",
      portrait: "3 / 4",
      wide: "16 / 9",
      ultrawide: "18 / 5",
      golden: "1.618 / 1",
    },
    border: `${rem(1)} solid var(--mantine-color-default-border)`,
  },
  components: {
    Select: Select.extend({
      defaultProps: {
        allowDeselect: false,
        checkIconPosition: "right",
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        arrowSize: 10,
        arrowRadius: 4,
      },
      classNames: {
        tooltip: "vef-tooltip",
      },
    }),
    ScrollArea: ScrollArea.extend({
      defaultProps: {
        overscrollBehavior: "none",
      },
    }),
    Notification: Notification.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
        withCloseButton: true,
        withOverlay: true,
        transitionProps: { transition: "pop" },
        overlayProps: {
          backgroundOpacity: 0.3,
          blur: "var(--mantine-blur-xs)",
        },
      },
    }),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
