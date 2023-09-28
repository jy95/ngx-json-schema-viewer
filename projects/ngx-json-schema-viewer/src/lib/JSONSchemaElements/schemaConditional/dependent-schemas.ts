import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AllOfSchemaComponent } from "@theme/JSONSchemaViewer/JSONSchemaElements/schemaComposition/all-of-schema.component";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependent-schemas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <app-all-of-schema [schema]="simplifiedSchema"></app-all-of-schema>
  `,
})
export class DependentSchemasComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get dependentSchemas(): JSONSchemaNS.Object {
    return this.schema as JSONSchemaNS.Object;
  }

  get simplifiedSchema(): Exclude<JSONSchema, true | false> {
    const allOf = Object.entries(this.dependentSchemas).map(([property, subSchema]) => ({
      if: {
        type: "object",
        required: [property],
      },
      then: subSchema,
    }));

    return { allOf };
  }
}
