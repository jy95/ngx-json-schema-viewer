//import { moduleMetadata } from '@storybook/angular';

import { NgxJsonSchemaViewerComponent } from "ngx-json-schema-viewer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';

import type { Meta, StoryObj } from '@storybook/angular';

const meta : Meta<NgxJsonSchemaViewerComponent> = {
    //component: NgxJsonSchemaViewerComponent,
    title: "Array",
    decorators: [
      moduleMetadata({
        imports: [
          BrowserAnimationsModule,
          NgxJsonSchemaViewerComponent
        ]
      })
    ]
};

export default meta;

type Story = StoryObj<NgxJsonSchemaViewerComponent>;

// https://storybook.js.org/docs/angular/writing-stories/naming-components-and-hierarchy#grouping
export const AdditionalItems1 : Story = {
    render: (args) => ({
      props: args,
      template: `
        <ngx-json-schema-viewer></ngx-json-schema-viewer>
      `
    }),
    args: {
        schema: {
            "type": "array",
            "items": [
              {
                "type": "integer"
              },
              {
                "type": "string"
              }
            ],
            "additionalItems": false
        }
    }
}