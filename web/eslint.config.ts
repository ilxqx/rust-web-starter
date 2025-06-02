import { antfu as defineConfig } from "@antfu/eslint-config";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig(
  {
    type: "app",
    ignores: [],
    stylistic: {
      indent: 2,
      jsx: true,
      quotes: "double",
      semi: true,
      overrides: {
        "style/line-comment-position": [
          "error",
          {
            position: "above",
          },
        ],
        "style/jsx-self-closing-comp": [
          "error",
          {
            component: true,
            html: true,
          },
        ],
        "style/jsx-newline": [
          "error",
          {
            prevent: true,
            allowMultilines: true,
          },
        ],
        "style/jsx-props-no-multi-spaces": "error",
        "style/jsx-sort-props": [
          "error",
          {
            callbacksLast: true,
            shorthandFirst: true,
            shorthandLast: false,
            multiline: "last",
            ignoreCase: true,
            noSortAlphabetically: false,
            reservedFirst: ["key", "ref"],
          },
        ],
        "style/newline-per-chained-call": [
          "error",
          {
            ignoreChainWithDepth: 3,
          },
        ],
        "style/object-property-newline": "error",
        "style/brace-style": [
          "error",
          "1tbs",
        ],
        "style/arrow-parens": [
          "error",
          "as-needed",
        ],
        "style/multiline-comment-style": [
          "error",
          "separate-lines",
          {
            checkJSDoc: false,
          },
        ],
        "style/implicit-arrow-linebreak": [
          "error",
          "beside",
        ],
        "style/no-extra-semi": "error",
        "style/array-element-newline": [
          "error",
          "consistent",
        ],
        "style/function-call-argument-newline": [
          "error",
          "consistent",
        ],
        "style/padding-line-between-statements": [
          "error",
          {
            blankLine: "always",
            prev: "*",
            next: [
              "block",
              "multiline-block-like",
              "type",
              "interface",
              "enum",
              "function",
              "function-overload",
            ],
          },
          {
            blankLine: "always",
            prev: [
              "block",
              "multiline-block-like",
              "type",
              "interface",
              "enum",
              "function",
              "function-overload",
            ],
            next: "*",
          },
        ],
        "style/jsx-pascal-case": [
          "error",
          {
            allowAllCaps: false,
            allowLeadingUnderscore: false,
            allowNamespace: false,
            ignore: [],
          },
        ],
        "style/switch-colon-spacing": [
          "error",
          {
            before: false,
            after: true,
          },
        ],
        "style/object-curly-newline": [
          "error",
          {
            ObjectExpression: {
              multiline: true,
              consistent: true,
              minProperties: 3,
            },
            ObjectPattern: {
              multiline: true,
              consistent: true,
              minProperties: 3,
            },
            ImportDeclaration: {
              consistent: true,
              multiline: true,
            },
            ExportDeclaration: {
              consistent: true,
              multiline: true,
            },
          },
        ],
        "style/no-extra-parens": [
          "error",
          "all",
          {
            nestedBinaryExpressions: false,
            ternaryOperandBinaryExpressions: false,
            ignoreJSX: "multi-line",
          },
        ],
        "style/quote-props": ["error", "as-needed"],
        "style/no-multiple-empty-lines": [
          "error",
          {
            max: 1,
            maxBOF: 0,
            maxEOF: 0,
          },
        ],
        "style/no-multi-spaces": [
          "error",
          {
            ignoreEOLComments: false,
          },
        ],
      },
    },
    javascript: {
      overrides: {
        "prefer-object-spread": "error",
        "func-style": [
          "error",
          "declaration",
          {
            allowArrowFunctions: true,
          },
        ],
        curly: [
          "error",
          "all",
        ],
        "no-useless-escape": "error",
        "no-useless-concat": "error",
        "no-unused-private-class-members": "error",
        "no-unsafe-optional-chaining": "error",
        "no-dupe-else-if": "error",
        "no-eq-null": "error",
        "no-extra-label": "error",
        "no-negated-condition": "error",
        "no-invalid-this": "off",
        "no-throw-literal": "off",
        "arrow-body-style": [
          "error",
          "as-needed",
          {
            requireReturnForObjectLiteral: true,
          },
        ],
        "prefer-object-has-own": "error",
        "prefer-numeric-literals": "error",
        "prefer-named-capture-group": "error",
        "prefer-destructuring": "error",
        "object-shorthand": "error",
        "require-atomic-updates": "error",
        "require-await": "error",
        camelcase: [
          "error",
          {
            properties: "always",
            ignoreGlobals: true,
          },
        ],
        "no-promise-executor-return": [
          "error",
          {
            allowVoid: true,
          },
        ],
        "array-callback-return": [
          "error",
          {
            allowImplicit: true,
          },
        ],
        "sort-imports": "off",
        "no-console": "off",
      },
    },
    typescript: {
      overrides: {
        "ts/no-unused-expressions": [
          "error",
          {
            enforceForJSX: true,
          },
        ],
        "ts/no-unused-vars": [
          "error",
          {
            args: "after-used",
            caughtErrors: "all",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        "ts/array-type": [
          "error",
          {
            default: "array-simple",
            readonly: "array-simple",
          },
        ],
        "ts/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow",
          },
        ],
        "ts/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "ts/max-params": [
          "error",
          {
            max: 4,
          },
        ],
        "ts/ban-ts-comment": "off",
        "ts/no-this-alias": "off",
      },
    },
    react: {
      overrides: {
        "react-naming-convention/component-name": ["error", "PascalCase"],
        "react-naming-convention/filename-extension": [
          "error",
          {
            allow: "as-needed",
            extensions: [".tsx"],
          },
        ],
        "react-hooks-extra/no-redundant-custom-hook": "error",
        "react-hooks-extra/no-unnecessary-use-memo": "error",
        "react-hooks-extra/no-unnecessary-use-callback": "error",
        "react-naming-convention/use-state": "off",
        "react-refresh/only-export-components": "off",
        "react-hooks/exhaustive-deps": [
          "error",
          {
            additionalHooks: "^use(Deep|Shallow)",
          },
        ],
        "react/no-class-component": "error",
        "react/no-clone-element": "off",
        "react/no-children-prop": "off",
        "react/no-children-to-array": "off",
        "react/no-children-for-each": "off",
        "react/no-children-count": "off",
      },
    },
    gitignore: true,
    vue: false,
    jsx: true,
    regexp: true,
    jsonc: true,
    yaml: true,
    toml: true,
    markdown: {
      overrides: {
        "markdown/fenced-code-language": "error",
        "markdown/no-duplicate-headings": "error",
        "markdown/no-empty-links": "error",
      },
    },
    test: false,
    formatters: {
      markdown: "prettier",
      prettierOptions: {
        singleQuote: false,
        semi: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "all",
        endOfLine: "lf",
        printWidth: 160,
        proseWrap: "never",
        arrowParens: "avoid",
        htmlWhitespaceSensitivity: "strict",
        bracketSameLine: true,
        bracketSpacing: true,
        quoteProps: "as-needed",
        jsxSingleQuote: false,
        singleAttributePerLine: false,
      },
    },
  },
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-string-trim-start-end": "error",
      "unicorn/prefer-string-raw": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-index-of": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-single-call": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-array-for-each": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-unnecessary-await": "error",
      "unicorn/no-unnecessary-polyfills": "error",
      "unicorn/no-useless-undefined": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-unused-properties": "error",
      "unicorn/no-useless-promise-resolve-reject": "error",
      "import/order": "off",
      "import/first": "error",
      "import/export": "error",
      "import/no-named-as-default": "off",
      "import/no-named-default": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          fallbackSort: {
            type: "alphabetical",
            order: "asc",
          },
          newlinesBetween: "always",
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          type: "natural",
          order: "asc",
          fallbackSort: {
            type: "alphabetical",
            order: "asc",
          },
          newlinesBetween: "always",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groupKind: "values-first",
        },
      ],
      "perfectionist/sort-named-exports": [
        "error",
        {
          type: "natural",
          groupKind: "values-first",
        },
      ],
      "perfectionist/sort-modules": [
        "error",
        {
          type: "unsorted",
          newlinesBetween: "ignore",
        },
      ],
      "eslint-comments/no-unlimited-disable": "off",
    },
  },
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
);
