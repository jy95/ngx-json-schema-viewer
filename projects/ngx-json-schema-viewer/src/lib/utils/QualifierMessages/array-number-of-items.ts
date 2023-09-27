import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { JSONSchemaNS, JSONSchema } from '../../types';
type typedJSONArraySchema = JSONSchemaNS.Array;

@Component({
  selector: 'qm-array-number-of-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
        <strong>Length :</strong>
        &nbsp;
        <ng-container *ngIf="typedSchema.minItems !== undefined">
          <code>
            {{ getMinItemsLabel(typedSchema.minItems!) }}
          </code>
        </ng-container>
        <ng-container *ngIf="typedSchema.minItems !== undefined && typedSchema.maxItems !== undefined">
          <app-and-label></app-and-label>
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
  @Input() schema!: Exclude<JSONSchema, true | false>;

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
}
