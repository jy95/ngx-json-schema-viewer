import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let entry of propertiesEntries">
        <app-create-edge
          [name]="generatePropertyName(entry[0])"
          [schema]="entry[1]"
          [required]="isRequired(entry[0])"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreatePropertiesComponent {
  @Input() schema!: JSONSchemaNS.Object;

  get propertiesEntries() {
    return Object.entries(this.schema.properties || {});
  }

  generatePropertyName(key: string): string {
    return `<strong>${key}</strong>`;
  }

  isRequired(key: string): boolean {
    return Array.isArray(this.schema.required) ? this.schema.required.includes(key) : false;
  }
}
