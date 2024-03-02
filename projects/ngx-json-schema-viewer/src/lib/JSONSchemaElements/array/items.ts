
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-array-items',
  standalone: true,
  imports: [
    forwardRef(() => CreateEdgeComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (item of itemsAsArray; track item; let idx = $index) {
        <jse-common-create-edge [schema]="item" [required]="isMinItemsValid()">
          <code name>
            {{ itemsLabel(startingIndex + idx, isArray) }}
          </code>
        </jse-common-create-edge>
      }
    </ul>
    `,
})
export class CreateItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get itemsAsArray(): JSONSchema[] {
    if (this.schema.items === undefined) {
      return [];
    }
    return Array.isArray(this.schema.items) ? this.schema.items : [this.schema.items];
  }

  get startingIndex(): number {
    return Array.isArray(this.schema.prefixItems) ? this.schema.prefixItems.length : 0;
  }

  get isArray(): boolean {
    return Array.isArray(this.schema.items);
  }

  isMinItemsValid(): boolean {
    return this.schema.minItems !== undefined && this.schema.minItems >= this.itemsAsArray.length;
  }

  itemsLabel(index: number, isArray: boolean): string {
    const finalIdx = isArray ? index.toString() : 'x';
    return `items[${finalIdx}]`;
  }
}
