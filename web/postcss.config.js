import presetMantine from "postcss-preset-mantine";
import postcssSimpleVars from "postcss-simple-vars";

export default {
  plugins: [
    presetMantine({
      autoRem: false,
      mixins: {},
    }),
    postcssSimpleVars({
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    }),
  ],
};
