import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-array-unevaluated-items',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <jse-common-create-edge [schema]="items" [required]="false">
        <code name>
          {{ unevaluatedItemsLabel() }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateUnevaluatedItemsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get items() : JSONSchema {
    return this.schema.unevaluatedItems!;
  }

  unevaluatedItemsLabel(): string {
    return `items[y]`;
  }
}
