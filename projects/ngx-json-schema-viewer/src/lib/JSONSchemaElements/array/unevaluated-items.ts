import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-unevaluated-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(items)">
      <li>
        <app-create-edge
          key="array_unevaluatedItems"
          [name]="unevaluatedItemsLabel()"
          [schema]="items"
          [required]="false"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnevaluatedItemsComponent {
  @Input() schema!: JSONSchemaNS.Array;

  get items() {
    return this.schema.unevaluatedItems;
  }

  isUndefinedOrBoolean(value: any): boolean {
    return value === undefined || typeof value === 'boolean';
  }

  unevaluatedItemsLabel(): string {
    return `items[y]`;
  }
}
