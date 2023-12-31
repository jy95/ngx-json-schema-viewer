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
                // BrowserAnimationsModule
                provideAnimations(),
                // HighlightModule 
                {
                    provide: HIGHLIGHT_OPTIONS,
                    useValue: {
                        coreLibraryLoader: () => import('highlight.js/lib/core'),
                        languages: {
                            json: () => import('highlight.js/lib/languages/json'),
                        }
                    }
                },
                // Json schema viewer options
                {
                    provide: JSV_OPTIONS,
                    useValue: {}
                }
            ],
        })
    ]
}

// Story type
export type Story = StoryObj<NgxJsonSchemaViewerComponent>;

// Params, in case we want to create custom stories
export type ComponentProps = NgxJsonSchemaViewerComponent;

// A default Story builder, for 95% of the test scenario here
// https://storybook.js.org/docs/angular/writing-stories/naming-components-and-hierarchy#grouping
// https://www.chromatic.com/setup
type Params = Pick<ComponentProps, "schema" | "resolverOptions"> & {
    // to customize Storybook name
    "storybook-name"?: string
}
export function createStory(params : Params): Story {
    return {
        storyName: params['storybook-name'] || undefined,
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
    }
}
