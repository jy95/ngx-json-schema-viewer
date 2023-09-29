import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-object-property-names',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul *ngIf="isPropertyNamesValid()">
      <li>
        <jse-common-create-edge [schema]="generateSchema()" [required]="false">
          <code name>
            {{ generatePropertyName() }}
          </code>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class PropertyNamesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  isPropertyNamesValid(): boolean {
    const propertyNames = this.schema.propertyNames;
    return (
      propertyNames !== undefined &&
      typeof propertyNames !== "boolean" &&
      propertyNames.pattern !== undefined
    );
  }

  generatePropertyName(): string {
    const propertyNames = this.schema.propertyNames!;
    const pattern = typeof propertyNames !== "boolean" ? propertyNames?.pattern : "";
    return `${pattern}`;
  }

  generateSchema(): JSONSchema {
    const propertyNames = this.schema.propertyNames;
    if (propertyNames && typeof propertyNames !== "boolean") {
      const { pattern, ...newSchema } = propertyNames;
      return newSchema;
    }
    return {};
  }
}
