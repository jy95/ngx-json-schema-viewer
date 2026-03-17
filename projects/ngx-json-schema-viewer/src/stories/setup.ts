import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxJsonSchemaViewerComponent, JSV_OPTIONS } from "ngx-json-schema-viewer";
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import type { Meta, StoryObj } from '@storybook/angular';

// Return a pre-configured meta object to be export
export type MetaViewer = Meta<NgxJsonSchemaViewerComponent>;
export const defaultMeta : Meta<NgxJsonSchemaViewerComponent> = {
  decorators: [
    moduleMetadata({
      imports: [NgxJsonSchemaViewerComponent],
    }),
    applicationConfig({
      providers: [
        provideAnimations(),
        {
          provide: HIGHLIGHT_OPTIONS,
          useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            languages: {
              json: () => import('highlight.js/lib/languages/json'),
            }
          }
        },
        {
          provide: JSV_OPTIONS,
          useValue: {}
        }
      ],
    })
  ]
};

// Story type
export type Story = StoryObj<NgxJsonSchemaViewerComponent>;

// Params, in case we want to create custom stories
export type ComponentProps = NgxJsonSchemaViewerComponent;

type Params = Pick<ComponentProps, "schema" | "resolverOptions"> & {
  "storybook-name"?: string
};

export function createStory(params : Params): Story {
  return {
    name: params['storybook-name'] || undefined,
    render: (args) => ({
      props: args,
      template: `
        <ngx-json-schema-viewer [schema]="schema" [resolverOptions]="resolverOptions"></ngx-json-schema-viewer>
      `,
    }),
    args: {
      schema: params.schema,
      resolverOptions: params.resolverOptions || undefined,
    }
  };
}
