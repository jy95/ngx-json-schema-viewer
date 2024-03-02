
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array-prefix-items',
  standalone: true,
  imports: [
    forwardRef(() => CreateEdgeComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (val of arrayItems; track val; let idx = $index) {
        <jse-common-create-edge [schema]="val" [required]="isMinItemsValid()">
          <code name>
            {{ prefixItemsLabel(idx) }}
          </code>
        </jse-common-create-edge>
      }
    </ul>
    `,
})
export class CreatePrefixItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get arrayItems() : JSONSchema[] {
    if (this.schema.prefixItems === undefined) {
      return [];
    }
    return Array.isArray(this.schema.prefixItems) ? this.schema.prefixItems : [this.schema.prefixItems] as JSONSchema[];
  } 

  isMinItemsValid(): boolean {
    return this.schema.minItems !== undefined && this.schema.minItems >= this.arrayItems.length;
  }

  prefixItemsLabel(index: number): string {
    return `items[${index}]`;
  }
}
