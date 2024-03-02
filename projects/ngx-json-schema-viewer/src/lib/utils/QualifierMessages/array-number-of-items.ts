import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import { AndLabelComponent } from "../../labels/and-label";

import type { JSONSchemaNS, JSONSchema } from '../../types';
type typedJSONArraySchema = JSONSchemaNS.Array;

@Component({
  selector: 'qm-array-number-of-items',
  standalone: true,
  imports: [AndLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>Length :</strong>
      &nbsp;
      @if (typedSchema.minItems !== undefined) {
        <code>
          {{ getMinItemsLabel(typedSchema.minItems!) }}
        </code>
      }
      @if (hasMinAndMax) {
        <labels-and></labels-and>
      }
      @if (typedSchema.maxItems !== undefined) {
        <code>
          {{ getMaxItemsLabel(typedSchema.maxItems!) }}
        </code>
      }
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
