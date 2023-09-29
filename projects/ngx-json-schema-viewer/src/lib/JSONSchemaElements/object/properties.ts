import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-properties',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul>
      <li *ngFor="let entry of propertiesEntries">
        <jse-common-create-edge [schema]="entry[1]" [required]="isRequired(entry[0])">
          <strong name>
            {{ generatePropertyName(entry[0]) }}
          </strong>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreatePropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get propertiesEntries() {
    return Object.entries(this.schema.properties || {});
  }

  generatePropertyName(key: string): string {
    return `${key}`;
  }

  isRequired(key: string): boolean {
    return Array.isArray(this.schema.required) ? this.schema.required.includes(key) : false;
  }
}
