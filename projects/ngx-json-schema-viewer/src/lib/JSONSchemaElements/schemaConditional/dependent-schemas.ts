import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  AllOfSchemaComponent
} from "../schemaComposition/index";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependent-schemas',
  standalone: true,
  imports: [CommonModule,AllOfSchemaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <jse-schema-composition-all-of [schema]="simplifiedSchema" />
  `,
})
export class DependentSchemasComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

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
