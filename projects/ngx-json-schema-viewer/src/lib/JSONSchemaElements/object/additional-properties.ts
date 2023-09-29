import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-additional-properties',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(additionalProperties)">
      <li>
        <jse-common-create-edge [schema]="additionalProperties!" [required]="false">
          <code name>
            {{ additionalPropertiesLabel() }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateAdditionalPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get additionalProperties() {
    return this.schema.additionalProperties;
  }

  isUndefinedOrBoolean(value: any): boolean {
    return value === undefined || typeof value === 'boolean';
  }

  additionalPropertiesLabel(): string {
    return `property name*`;
  }
}
