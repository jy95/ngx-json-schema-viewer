import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from '../../types';

@Component({
  selector: 'jse-array-contains',
  standalone: true,
  imports: [
    forwardRef(() => CreateEdgeComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <jse-common-create-edge [schema]="item" [required]="isMinContainsValid()">
        <code name>
          {{ containsLabel }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateContainsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get item() : JSONSchema {
    return this.schema.contains!;
  }

  get containsLabel() {
    return `items[..., x, ...]`;
  }

  isMinContainsValid(): boolean {
    return this.schema.minContains !== undefined && this.schema.minContains > 0;
  }
}
