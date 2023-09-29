//import { moduleMetadata } from '@storybook/angular';

import { NgxJsonSchemaViewerComponent } from "ngx-json-schema-viewer";

import type { Meta, StoryObj } from '@storybook/angular';

const meta : Meta<NgxJsonSchemaViewerComponent> = {
    component: NgxJsonSchemaViewerComponent
};

export default meta;

type Story = StoryObj<NgxJsonSchemaViewerComponent>;

// https://storybook.js.org/docs/angular/writing-stories/naming-components-and-hierarchy#grouping
export const AdditionalItems1 : Story = {
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