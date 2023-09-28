import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import type { JSONSchemaNS } from '../../types';

@Component({
  selector: 'jse-array-contains',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngIf="!isUndefined(item)">
        <app-create-edge
          [name]="containsLabel"
          [schema]="item"
          [required]="isMinContainsValid()"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreateContainsComponent {
  @Input() schema!: JSONSchemaNS.Array;

  get item() {
    return this.schema.contains;
  }

  get containsLabel() {
    return `
      <code>
        items[..., x, ...]
      </code>
    `;
  }

  isUndefined(value: any): boolean {
    return value === undefined;
  }

  isMinContainsValid(): boolean {
    return this.schema.minContains !== undefined && this.schema.minContains > 0;
  }
}
