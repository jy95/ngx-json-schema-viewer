import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator } from '@storybook/angular';
import docJson from "../documentation.json";
setCompodocJson(docJson);

// https://storybook.js.org/docs/angular/configure/styling-and-css#importing-css-files
import "../src/styles/global.scss"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    // https://material.angular.io/guide/theming#application-background-color
    componentWrapperDecorator((story) => `<div class="mat-app-background">${story}</div>`),
  ]
};

export default preview;