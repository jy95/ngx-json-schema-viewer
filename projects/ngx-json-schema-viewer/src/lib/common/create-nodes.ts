import { CommonModule } from '@angular/common';
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
    CommonModule,
    forwardRef(() => SchemaConditionalComponent),
    forwardRef(() => SchemaCompositionComponent),
    forwardRef(() => CreateTypesComponent),
    forwardRef(() => CreateValidOrInvalidComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="typedSchema !== undefined; else BooleanSchema">

      <!-- Handle standard types -->
      <jse-common-create-types [schema]="typedSchema" />

      <!-- Handle Composition -->
      <ng-container *ngIf="isCompositionSchema">
        <jse-schema-composition [schema]="typedSchema" />
      </ng-container>

      <!-- Handle Conditional -->
      <ng-container *ngIf="isConditionalSchema">
        <jse-schema-conditional [schema]="typedSchema" />
      </ng-container>
      
    </ng-container>

    <ng-template #BooleanSchema>
      <jse-common-create-valid-or-invalid [schema]="schema" />
    </ng-template>
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
