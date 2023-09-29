import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from '../../types';

@Component({
  selector: 'jse-array-contains',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul>
      <li *ngIf="!isUndefined(item)">
        <jse-common-create-edge [schema]="item!" [required]="isMinContainsValid()">
          <code name>
            {{ containsLabel }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateContainsComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  get item() {
    return this.schema.contains;
  }

  get containsLabel() {
    return `items[..., x, ...]`;
  }

  isUndefined(value: any): boolean {
    return value === undefined;
  }

  isMinContainsValid(): boolean {
    return this.schema.minContains !== undefined && this.schema.minContains > 0;
  }
}
