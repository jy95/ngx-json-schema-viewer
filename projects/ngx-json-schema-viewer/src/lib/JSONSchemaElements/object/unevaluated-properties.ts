import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-unevaluated-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="!isUndefinedOrBoolean(unevaluatedProperties)">
      <li>
        <app-create-edge
          key="object_unevaluatedProperties"
          [name]="unevaluatedPropertiesLabel()"
          [schema]="unevaluatedProperties"
          [required]="false"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnevaluatedPropertiesComponent {
  @Input() schema!: JSONSchemaNS.Object;

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
