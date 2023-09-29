import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  AllOfSchemaComponent
} from "../schemaComposition/index";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependent-required',
  standalone: true,
  imports: [CommonModule,AllOfSchemaComponent],
  template: `
    <jse-schema-composition-all-of [schema]="simplifiedSchema" />
  `,
})
export class DependentRequiredComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

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
