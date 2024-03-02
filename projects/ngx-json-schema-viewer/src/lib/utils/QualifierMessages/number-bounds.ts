
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  AndLabelComponent
} from "../../labels/index";

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-number-bounds',
  standalone: true,
  imports: [AndLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ boundsLabel }}</strong>&nbsp;
      @if (minimum !== undefined) {
        <code>
          @switch (isExclusiveMinimum) {
            @case (true) {
              <span>&gt;</span>
            }
            @default {
              <span>&ge;</span>
            }
          }
          {{ minimum }}
        </code>
      }
      @if (minAndMax) {
        <labels-and />
      }
      @if (maximum !== undefined) {
        <code>
          @switch (isExclusiveMaximum) {
            @case (true) {
              <span>&lt;</span>
            }
            @default {
              <span>&le;</span>
            }
          }
          {{ maximum }}
        </code>
      }
    </div>
    `,
})
export class NumberBoundsComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  boundsLabel = 'Possible values :';
  
  get minimum() : number | undefined { 
    return this.schema.exclusiveMinimum || this.schema.minimum; 
  }

  get isExclusiveMinimum(): boolean {
    return this.schema.exclusiveMinimum !== undefined;
  }

  get maximum(): number | undefined {
    return this.schema.exclusiveMaximum || this.schema.maximum;
  }

  get isExclusiveMaximum() : boolean {
    return this.minimum !== undefined && this.maximum !== undefined;
  }

  get minAndMax() : boolean {
    return this.minimum !== undefined && this.maximum !== undefined;
  }

}
