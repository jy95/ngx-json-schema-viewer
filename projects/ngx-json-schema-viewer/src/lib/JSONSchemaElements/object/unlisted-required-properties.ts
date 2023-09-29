import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-unlisted-properties',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul>
      <li *ngFor="let prop of unlistedProperties">
        <jse-common-create-edge
          [schema]="true"]
          [required]="true"]
        >
          <strong name>
            {{ generatePropertyName(prop) }}
          </strong>
        </jse-common-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnlistedPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get unlistedProperties() {
    const required: string[] = (this.schema.required || []) as string[];
    const listedProperties = Object.keys(this.schema.properties || {});
    return required.filter((r) => !listedProperties.includes(r));
  }

  generatePropertyName(prop: string): string {
    return `${prop}`;
  }
}
