import { Component, Input } from '@angular/core';
import { JSONSchema } from '../../types';

@Component({
  selector: 'app-array-number-of-items',
  templateUrl: './array-number-of-items.component.html',
})
export class ArrayNumberOfItemsComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  // minItems
  getMinItemsLabel(value: number): string {
    return `>= ${value}`;
  }

  // maxItems
  getMaxItemsLabel(value: number): string {
    return `<= ${value}`;
  }
}
