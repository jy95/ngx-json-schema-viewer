import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
    SchemaConditionalComponent,
    SchemaCompositionComponent,
    CreateTypesComponent,
    CreateValidOrInvalidComponent
  ],
  template: `
    <ng-container *ngIf="isBooleanSchema">
      <jse-common-create-valid-or-invalid [schema]="schema" />
    </ng-container>

    <ng-container *ngIf="!isBooleanSchema">

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
  `,
})
export class CreateNodesComponent {
  @Input() schema!: JSONSchema;

  // Define a method to check if the schema is a boolean
  get isBooleanSchema(): boolean {
    return typeof this.schema === 'boolean';
  }

  get typedSchema(): Exclude<JSONSchema, false | true> {
    return this.schema as Exclude<JSONSchema, false | true>;
  }

  // Define a method to check if the schema is a composition
  get isCompositionSchema(): boolean {
    return isSchemaComposition(this.schema);
  }

  // Define a method to check if the schema is conditional
  get isConditionalSchema(): boolean {
    return isSchemaConditional(this.schema);
  }
}
