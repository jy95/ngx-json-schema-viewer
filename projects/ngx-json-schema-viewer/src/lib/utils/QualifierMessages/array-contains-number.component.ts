import { Component, Input } from '@angular/core';
import { JSONSchema } from '../../types';

@Component({
  selector: 'app-array-contains-number',
  templateUrl: './array-contains-number.component.html',
})
export class ArrayContainsNumberComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  // minContains
  getMinContainsLabel(value: number): string {
    return `at least ${value} valid item(s)`;
  }

  // maxContains
  getMaxContainsLabel(value: number): string {
    return `at most ${value} valid item(s)`;
  }
}
