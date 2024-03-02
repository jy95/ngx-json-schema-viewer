
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from '../../types';

@Component({
  selector: 'jse-array-additional-items',
  standalone: true,
  imports: [
    forwardRef(() => CreateEdgeComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <jse-common-create-edge [schema]="items" [required]="isMinItemsValid()">
        <code name>
          {{ additionalItemsLabel(startingIndex) }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateAdditionalItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get items() : JSONSchema {
    return this.schema.additionalItems!;
  }
  
  get startingIndex() : number {
    return Array.isArray(this.schema.items) ? this.schema.items.length : 1;
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
