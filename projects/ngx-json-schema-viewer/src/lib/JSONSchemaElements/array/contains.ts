import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from '../../types';

@Component({
  selector: 'jse-array-contains',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="item !== undefined">
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

  item : JSONSchema | undefined = this.schema.contains;

  get containsLabel() {
    return `items[..., x, ...]`;
  }

  isMinContainsValid(): boolean {
    return this.schema.minContains !== undefined && this.schema.minContains > 0;
  }
}
