import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxJsonSchemaViewerComponent } from "ngx-json-schema-viewer";
import { moduleMetadata, applicationConfig } from '@storybook/angular';

import type { Meta, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';

// Return a pre-configured meta object to be export
export type MetaViewer = Meta<NgxJsonSchemaViewerComponent>;
export const defaultMeta : Meta<NgxJsonSchemaViewerComponent> = {
    decorators: [
        moduleMetadata({
            imports: [NgxJsonSchemaViewerComponent],
        }),
        applicationConfig({
            providers: [
                //importProvidersFrom(BrowserAnimationsModule),
                provideAnimations()
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
type Params = Pick<ComponentProps, "schema" | "resolverOptions" | "vierwerOptions"> & {
    // to customize Storybook name
    "storybook-name"?: string
}
export function createStory(params : Params): Story {
    return {
        storyName: params['storybook-name'] || undefined,
        render: (args) => ({
            props: args,
            template: `
              <ngx-json-schema-viewer [schema]="schema" [resolverOptions]="resolverOptions" [vierwerOptions]="vierwerOptions"></ngx-json-schema-viewer>
            `
        }),
        args: {
            schema: params.schema,
            resolverOptions: params.resolverOptions || undefined,
            vierwerOptions: params.vierwerOptions || undefined,
        }
    }
}