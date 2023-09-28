import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-object-property-names',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="isPropertyNamesValid()">
      <li>
        <app-create-edge
          key="propertyNames"
          [name]="generatePropertyName()"
          [schema]="generateSchema()"
          [required]="false"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class PropertyNamesComponent {
  @Input() schema!: JSONSchemaNS.Object;

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
    return `<code>${pattern}</code>`;
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
