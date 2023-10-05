import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-array-items',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul>
      <jse-common-create-edge [schema]="item" [required]="isMinItemsValid()" *ngFor="let item of itemsAsArray; let idx = index">
        <code name>
          {{ itemsLabel(startingIndex + idx, isArray) }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  itemsAsArray: JSONSchema[] = (this.schema.items === undefined) 
    ? [] 
    : Array.isArray(this.schema.items) ? this.schema.items : [this.schema.items];

  startingIndex: number = Array.isArray(this.schema.prefixItems) ? this.schema.prefixItems.length : 0;
  isArray: boolean = Array.isArray(this.schema.items);

  isMinItemsValid(): boolean {
    return this.schema.minItems !== undefined && this.schema.minItems >= this.itemsAsArray.length;
  }

  itemsLabel(index: number, isArray: boolean): string {
    const finalIdx = isArray ? index.toString() : 'x';
    return `items[${finalIdx}]`;
  }
}
