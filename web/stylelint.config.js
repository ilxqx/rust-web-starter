import propertyGroups from "stylelint-config-recess-order/groups";

export default {
  extends: [
    "stylelint-config-recommended",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "order/order": [
      "dollar-variables",
      "at-variables",
      "custom-properties",
      "less-mixins",
      "declarations",
      "at-rules",
      "rules",
    ],
    "order/properties-order": propertyGroups.map(group => {
      return {
        ...group,
        emptyLineBefore: "always",
        noEmptyLineBetween: true,
      };
    }),
    "declaration-empty-line-before": null,
    "declaration-property-value-no-unknown": null,
    "at-rule-no-unknown": null,
    "function-no-unknown": null,
    "number-max-precision": null,
    "color-hex-length": "long",
    "color-hex-alpha": "never",
    "color-named": "never",
    "unit-allowed-list": [
      "px",
      "em",
      "rem",
      "%",
      "vw",
      "vh",
      "fr",
      "deg",
      "rad",
      "grad",
      "turn",
      "ms",
      "s",
    ],
  },
};
