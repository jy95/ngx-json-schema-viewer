import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import { AndLabelComponent } from "../../labels/and-label";

import type { JSONSchemaNS, JSONSchema } from '../../types';

type typedJSONArraySchema = JSONSchemaNS.Array;

@Component({
    selector: 'qm-array-contains',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>
    <strong>Must contain : </strong>
    @if (typedSchema.minContains) {
      <code>
        {{ getMinContainsLabel(typedSchema.minContains) }}
      </code>
    }
    @if (hasMinAndMax) {
      <labels-and></labels-and>
    }
    @if (typedSchema.maxContains !== undefined) {
      <code>
        {{ getMaxContainsLabel(typedSchema.maxContains) }}
      </code>
    }
  </div>
  `,
    imports: [AndLabelComponent]
})
export class ArrayContainsNumberComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

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

  get hasMinAndMax() : boolean {
    return this.typedSchema.minContains !== undefined && this.typedSchema.maxContains !== undefined;
  }
}
