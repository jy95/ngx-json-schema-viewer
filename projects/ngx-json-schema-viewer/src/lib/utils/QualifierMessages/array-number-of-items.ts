import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndLabelComponent } from "../../labels/and-label";

import type { JSONSchemaNS, JSONSchema } from '../../types';
type typedJSONArraySchema = JSONSchemaNS.Array;

@Component({
  selector: 'qm-array-number-of-items',
  standalone: true,
  imports: [CommonModule,AndLabelComponent],
  template: `
    <div>
        <strong>Length :</strong>
        &nbsp;
        <ng-container *ngIf="typedSchema.minItems !== undefined">
          <code>
            {{ getMinItemsLabel(typedSchema.minItems!) }}
          </code>
        </ng-container>
        <ng-container *ngIf="hasMinAndMax">
          <labels-and></labels-and>
        </ng-container>
        <ng-container *ngIf="typedSchema.maxItems !== undefined">
          <code>
            {{ getMaxItemsLabel(typedSchema.maxItems!) }}
          </code>
        </ng-container>
    </div>
  `
})
export class ArrayNumberOfItemsComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): typedJSONArraySchema {
    return this.schema as typedJSONArraySchema;
  }

  // minItems
  getMinItemsLabel(value: number): string {
    return `>= ${value}`;
  }

  // maxItems
  getMaxItemsLabel(value: number): string {
    return `<= ${value}`;
  }

  get hasMinAndMax(): boolean {
    return this.typedSchema.minItems !== undefined && this.typedSchema.maxItems !== undefined;
  }
}
