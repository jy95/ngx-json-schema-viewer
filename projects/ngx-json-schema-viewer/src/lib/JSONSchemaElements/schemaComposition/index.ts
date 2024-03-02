
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AllOfSchemaComponent } from "./all-of";
import { AnyOfSchemaComponent } from "./any-of";
import { NotSchemaComponent } from "./not";
import { OneOfSchemaComponent } from "./one-of";

export {
  AllOfSchemaComponent,
  AnyOfSchemaComponent,
  NotSchemaComponent,
  OneOfSchemaComponent
}

import type {
    JSONSchema
} from "../../types";

@Component({
  selector: 'jse-schema-composition',
  standalone: true,
  imports: [
    AllOfSchemaComponent,
    AnyOfSchemaComponent,
    NotSchemaComponent,
    OneOfSchemaComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (schema.oneOf) {
      <jse-schema-composition-one-of [schema]="schema" />
    }
    @if (schema.anyOf) {
      <jse-schema-composition-any-of [schema]="schema" />
    }
    @if (schema.allOf) {
      <jse-schema-composition-all-of [schema]="schema" />
    }
    @if (schema.not) {
      <jse-schema-composition-not [schema]="schema" />
    }
    `,
})
export class SchemaCompositionComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
