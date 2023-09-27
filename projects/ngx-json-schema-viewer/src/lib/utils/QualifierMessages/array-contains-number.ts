import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { JSONSchemaNS, JSONSchema } from '../../types';
type typedJSONArraySchema = JSONSchemaNS.Array;

@Component({
  selector: 'qm-array-contains-number',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
      <strong>Must contain : </strong>
      <ng-container *ngIf="typedSchema.minContains">
        <code>
          {{ getMinContainsLabel(typedSchema.minContains) }}
        </code>
      </ng-container>
      <ng-container *ngIf="typedSchema.minContains !== undefined && typedSchema.maxContains !== undefined">
        <app-and-label></app-and-label>
      </ng-container>
      <ng-container *ngIf="typedSchema.maxContains !== undefined">
        <code>
          {{ getMaxContainsLabel(typedSchema.maxContains) }}
        </code>
      </ng-container>
  </div>
  `
})
export class ArrayContainsNumberComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): typedJSONArraySchema {
    return this.schema as typedJSONArraySchema;
  }

  // minContains
  getMinContainsLabel(value: number): string {
    return `at least ${value} valid item(s)`;
  }

  // maxContains
  getMaxContainsLabel(value: number): string {
    return `at most ${value} valid item(s)`;
  }
}
