import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-items',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul>
      <li *ngFor="let item of itemsAsArray; let idx = index">
        <jse-common-create-edge [schema]="item!" [required]="isMinItemsValid()">
          <code name>
            {{ itemsLabel(startingIndex + idx, isArray) }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateItemsComponent {
  @Input() schema!: JSONSchemaNS.Array;

  itemsAsArray: any[] = [];
  startingIndex: number = 0;
  isArray: boolean = false;

  ngOnInit() {
    this.itemsAsArray = Array.isArray(this.schema.items) ? this.schema.items : [this.schema.items];
    this.startingIndex = Array.isArray(this.schema.prefixItems) ? this.schema.prefixItems.length : 0;
    this.isArray = Array.isArray(this.schema.items);
  }

  isMinItemsValid(): boolean {
    return this.schema.minItems !== undefined && this.schema.minItems >= this.itemsAsArray.length;
  }

  itemsLabel(index: number, isArray: boolean): string {
    const finalIdx = isArray ? index.toString() : 'x';
    return `items[${finalIdx}]`;
  }
}
