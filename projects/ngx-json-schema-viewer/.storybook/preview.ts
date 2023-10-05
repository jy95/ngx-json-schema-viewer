import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator } from '@storybook/angular';
import { themes } from '@storybook/theming';
import docJson from "../documentation.json";
setCompodocJson(docJson);

// https://storybook.js.org/docs/angular/configure/styling-and-css#importing-css-files
// For some reason, it doesn't work with my version of Angular
// import "../src/styles/global.scss"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
  ]
};

export default preview;
