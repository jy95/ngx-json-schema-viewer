import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from "@storybook/angular";
import type { Configuration } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
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
                  sassOptions: { includePaths: ['node_modules'] },
                },
              },
            ],
          },
        ],
      },
    },
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {},
  webpackFinal: async (config: Configuration) => {
    const webpack = require('webpack');

    // Merge all DefinePlugin instances into one to avoid NODE_ENV conflicts
    // between Angular CLI's and Storybook's webpack configs
    const definePlugins = config.plugins?.filter(
      (p: any) => p.constructor?.name === 'DefinePlugin'
    ) ?? [];

    if (definePlugins.length > 1) {
      const merged = definePlugins.reduce((acc: Record<string, any>, plugin: any) => ({
        ...acc,
        ...plugin.definitions,
      }), {});

      config.plugins = [
        ...(config.plugins?.filter((p: any) => p.constructor?.name !== 'DefinePlugin') ?? []),
        new webpack.DefinePlugin(merged),
      ];
    }

    return config;
  },
};

export default config;