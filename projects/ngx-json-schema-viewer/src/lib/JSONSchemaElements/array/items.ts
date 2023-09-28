import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let item of itemsAsArray; let idx = index">
        <app-create-edge
          [name]="itemsLabel(startingIndex + idx, isArray)"
          [schema]="item"
          [required]="isMinItemsValid()"
        ></app-create-edge>
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
