
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
    SchemaConditionalComponent,
    SchemaCompositionComponent,
} from "../JSONSchemaElements/index";

import {
  isSchemaComposition,
  isSchemaConditional,
} from '../utils/index';

import {
    CreateTypesComponent,
    CreateValidOrInvalidComponent
} from "./index";

import type { JSONSchema } from '../types';


@Component({
  selector: 'jse-common-create-nodes',
  standalone: true,
  imports: [
    forwardRef(() => SchemaConditionalComponent),
    forwardRef(() => SchemaCompositionComponent),
    forwardRef(() => CreateTypesComponent),
    forwardRef(() => CreateValidOrInvalidComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (typedSchema !== undefined) {
      <!-- Handle standard types -->
      <jse-common-create-types [schema]="typedSchema" />
      <!-- Handle Composition -->
      @if (isCompositionSchema) {
        <jse-schema-composition [schema]="typedSchema" />
      }
      <!-- Handle Conditional -->
      @if (isConditionalSchema) {
        <jse-schema-conditional [schema]="typedSchema" />
      }
    } @else {
      <jse-common-create-valid-or-invalid [schema]="schema" />
    }
    
    `,
})
export class CreateNodesComponent {
  @Input({ required: true }) schema!: JSONSchema;

  // Check if the schema is a composition
  get isCompositionSchema() : boolean {
    return isSchemaComposition(this.schema);
  };

  // Check if the schema is conditional
  get isConditionalSchema() : boolean {
    return isSchemaConditional(this.schema);
  };
  // Typed schema, if not a boolean
  get typedSchema(): Exclude<JSONSchema, false | true> | undefined {
    let isBooleanSchema = typeof this.schema === 'boolean';
    if (!isBooleanSchema) {
      return this.schema as Exclude<JSONSchema, false | true>;
    } else {
      return undefined;
    }
  };

}
