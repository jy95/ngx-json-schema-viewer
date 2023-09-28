import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-additional-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(additionalProperties)">
      <li>
        <app-create-edge
          key="object_additionalProperties"
          [name]="additionalPropertiesLabel()"
          [schema]="additionalProperties"
          [required]="false"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreateAdditionalPropertiesComponent {
  @Input() schema!: JSONSchemaNS.Object;

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
