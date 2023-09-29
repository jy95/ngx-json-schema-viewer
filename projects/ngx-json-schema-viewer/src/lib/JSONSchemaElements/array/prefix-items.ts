import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-prefix-items',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul>
      <li *ngFor="let val of array; let idx = index">
        <jse-common-create-edge [schema]="val!" [required]="isMinItemsValid()">
          <code name>
            {{ prefixItemsLabel(idx) }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreatePrefixItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  array: JSONSchema[] = [];

  ngOnInit() {
    this.array = Array.isArray(this.schema.prefixItems) ? this.schema.prefixItems : [this.schema.prefixItems!] as JSONSchema[];
  }

  isMinItemsValid(): boolean {
    return this.schema.minItems !== undefined && this.schema.minItems >= this.array.length;
  }

  prefixItemsLabel(index: number): string {
    return `items[${index}]`;
  }
}
