import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import {
    CreateValidOrInvalidComponent,
    RenderProvidedTypeComponent,
    RenderMultipleTypesComponent
} from "./index";

import {
    detectedTypes,
    isSchemaComposition
} from "../utils/index"

import type {
    TypeValues,
    JSONSchema
} from "../types";

@Component({
  selector: 'jse-common-create-types',
  standalone: true,
  imports: [CommonModule, CreateValidOrInvalidComponent, RenderProvidedTypeComponent,RenderMultipleTypesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>

      <ng-container *ngIf="foundTypes; else defaultCase">
        <!-- Case 1: Single type or type with null -->
        <ng-container *ngIf="foundTypes.length === 1 || (hasNull && foundTypes.length === 2); else case2">
          <jse-common-render-provided-type [schema]="schema" [type]="firstType" [nullable]="hasNull" />
        </ng-container>

        <!-- Case 2: Multiple types -->
        <ng-template #case2>
          <jse-common-multiple-types [schema]="schema" [types]="notNullTypeValues" [nullable]="hasNull" />
        </ng-template>
      </ng-container>

      <!-- Default Case: Handle cases like { "allOf": ... } or { "if": ... } -->
      <ng-template #defaultCase>
        <ng-container *ngIf="!hasSchemaComposition; else compositionCase">
          <jse-common-create-valid-or-invalid [schema]="schema" />
        </ng-container>

        <ng-template #compositionCase>
          <!--  Otherwise, we have a SchemaComposition, which will be handled by CreateNodes -->
        </ng-template>
      </ng-template>
    </ng-container>
  `,
})
export class CreateTypesComponent implements OnInit {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  // Props
  foundTypes : TypeValues[] = [];
  hasNull : boolean = false;
  hasSchemaComposition : boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  // Inits
  ngOnInit(): void {
    this.foundTypes = detectedTypes(this.schema);
    this.hasNull = this.foundTypes.includes("null");
    this.hasSchemaComposition = isSchemaComposition(this.schema);

    this.cdRef.markForCheck();
  }

  get firstType(): TypeValues {
    return this.foundTypes.find((s) => s !== "null") || this.foundTypes[0];
  }

  get notNullTypeValues(): TypeValues[] {
    return this.foundTypes.filter((s) => s !== "null");
  }

}
