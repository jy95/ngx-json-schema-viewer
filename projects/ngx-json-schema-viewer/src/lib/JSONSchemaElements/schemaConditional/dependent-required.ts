import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AllOfSchemaComponent } from "@theme/JSONSchemaViewer/JSONSchemaElements/schemaComposition/all-of-schema.component";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependent-required',
  standalone: true,
  imports: [CommonModule],
  template: `
    <app-all-of-schema [schema]="simplifiedSchema"></app-all-of-schema>
  `,
})
export class DependentRequiredComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get dependentRequired(): JSONSchemaNS.Object {
    return this.schema as JSONSchemaNS.Object;
  }

  get simplifiedSchema(): Exclude<JSONSchema, true | false> {
    const allOf = Object.entries(this.dependentRequired).map(
      ([property, requiredProperties]) => ({
        if: {
          type: "object",
          required: [property],
        },
        then: {
          type: "object",
          required: requiredProperties,
        },
      })
    );

    return { allOf };
  }
}
