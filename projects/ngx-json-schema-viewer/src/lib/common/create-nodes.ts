import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

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
    <ng-container *ngIf="typedSchema === undefined; else nonBooleanSchema">
      <jse-common-create-valid-or-invalid [schema]="schema" />
    </ng-container>

    <ng-template #nonBooleanSchema>

      <!-- Handle standard types -->
      <jse-common-create-types [schema]="typedSchema!" />

      <!-- Handle Composition -->
      <ng-container *ngIf="isCompositionSchema">
        <jse-schema-composition [schema]="typedSchema!" />
      </ng-container>

      <!-- Handle Conditional -->
      <ng-container *ngIf="isConditionalSchema">
        <jse-schema-conditional [schema]="typedSchema!" />
      </ng-container>
      
    </ng-template>
  `,
})
export class CreateNodesComponent implements OnInit {
  @Input({ required: true }) schema!: JSONSchema;

  // Check if the schema is a composition
  isCompositionSchema : boolean = false;
  // Check if the schema is conditional
  isConditionalSchema : boolean = false;
  // Typed schema, if not a boolean
  typedSchema: Exclude<JSONSchema, false | true> | undefined = undefined;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.isCompositionSchema = isSchemaComposition(this.schema);
      this.isConditionalSchema = isSchemaConditional(this.schema);
      let isBooleanSchema = typeof this.schema === 'boolean';
      if (isBooleanSchema) {
        this.typedSchema = this.schema as Exclude<JSONSchema, false | true>;
      } else {
        this.typedSchema = undefined;
      }

      this.cdRef.markForCheck();
  }

}
