// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/angular";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", {
    name: '@storybook/addon-styling-webpack',
    options: {
      rules: [
          {
              test: /\.scss$/,
              use: [
                  'style-loader',
                  'css-loader',
                  {
                      loader: 'sass-loader',
                      options: {
                          implementation: require.resolve('sass'),
                          sassOptions: {
                              includePaths: ['node_modules'],
                          },
                      },
                  },
              ],
          },
      ],
    },
  }, "@chromatic-com/storybook", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {}
};
export default config;
