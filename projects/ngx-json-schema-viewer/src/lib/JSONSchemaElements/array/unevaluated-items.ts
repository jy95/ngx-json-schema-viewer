import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-unevaluated-items',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(items)">
      <li>
        <jse-common-create-edge [schema]="items!" [required]="false">
          <code name>
            {{ unevaluatedItemsLabel() }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnevaluatedItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

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
