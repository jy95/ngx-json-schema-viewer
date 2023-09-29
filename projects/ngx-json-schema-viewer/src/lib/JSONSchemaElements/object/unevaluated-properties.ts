import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-unevaluated-properties',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(unevaluatedProperties)">
      <li>
        <jse-common-create-edge [schema]="unevaluatedProperties!" [required]="false">
          <code name>
            {{ unevaluatedPropertiesLabel() }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnevaluatedPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get unevaluatedProperties() {
    return this.schema.unevaluatedProperties;
  }

  isUndefinedOrBoolean(value: any): boolean {
    return value === undefined || typeof value === 'boolean';
  }

  unevaluatedPropertiesLabel(): string {
    return `property name*`;
  }
}
