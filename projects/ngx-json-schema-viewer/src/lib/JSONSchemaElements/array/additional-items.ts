import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from '../../types';

@Component({
  selector: 'jse-array-additional-items',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(items)">
      <li>
        <jse-common-create-edge [schema]="items!" [required]="isMinItemsValid()">
          <code name>
            {{ additionalItemsLabel(startingIndex) }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateAdditionalItemsComponent {
  @Input() schema!: JSONSchemaNS.Array;

  get items() {
    return this.schema.additionalItems;
  }

  get startingIndex() {
    return Array.isArray(this.schema.items) ? this.schema.items.length : 1;
  }

  isUndefinedOrBoolean(value: any): boolean {
    return value === undefined || typeof value === 'boolean';
  }

  isMinItemsValid(): boolean {
    return (
      this.schema.minItems !== undefined && this.startingIndex >= this.schema.minItems - 1
    );
  }

  additionalItemsLabel(count: number): string {
    return `items[${count},...]`;
  }
}
