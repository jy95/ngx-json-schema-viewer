import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-prefix-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let val of array; let idx = index">
        <app-create-edge
          [name]="prefixItemsLabel(idx)"
          [schema]="val"
          [required]="isMinItemsValid()"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreatePrefixItemsComponent {
  @Input() schema!: JSONSchemaNS.Array;

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
