
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  imports: [
    CreateValidOrInvalidComponent,
    RenderProvidedTypeComponent,
    RenderMultipleTypesComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
    
      @if (foundTypes.length > 0) {
        <!-- Case 1: Single type or type with null -->
        @if (hasSingleType) {
          <jse-common-render-provided-type [schema]="schema" [type]="firstType" [nullable]="hasNull" />
        } @else {
          <jse-common-multiple-types [schema]="schema" [types]="notNullTypeValues" [nullable]="hasNull" />
        }
        <!-- Case 2: Multiple types -->
      } @else {
        @if (!hasSchemaComposition) {
          <jse-common-create-valid-or-invalid [schema]="schema" />
        } @else {
          <!--  Otherwise, we have a SchemaComposition, which will be handled by CreateNodes -->
          <div></div>
        }
      }
    
      <!-- Default Case: Handle cases like { "allOf": ... } or { "if": ... } -->
    </ng-container>
    `,
})
export class CreateTypesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get foundTypes() : TypeValues[] {
    return detectedTypes(this.schema);
  }

  // Single type or type with null
  get hasSingleType(): boolean {
    return this.foundTypes.length === 1 || (this.hasNull && this.foundTypes.length === 2);
  }

  get hasNull() : boolean {
    return this.foundTypes.includes("null");
  }

  get hasSchemaComposition() : boolean {
    return isSchemaComposition(this.schema);
  }

  get firstType(): TypeValues {
    return this.foundTypes.find((s) => s !== "null") || this.foundTypes[0];
  }

  get notNullTypeValues(): TypeValues[] {
    return this.foundTypes.filter((s) => s !== "null");
  }

}
