import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator } from '@storybook/angular';
import { themes } from 'storybook/theming';
import docJson from "../documentation.json";
setCompodocJson(docJson);

// Because of https://github.com/storybookjs/storybook/issues/30691
import 'zone.js';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    }
  },

  decorators: [
    // https://material.angular.io/guide/theming#application-background-color
    componentWrapperDecorator((story) => `<div class="mat-app-background">${story}</div>`),
  ],

  tags: ["autodocs"]
};

export default preview;
