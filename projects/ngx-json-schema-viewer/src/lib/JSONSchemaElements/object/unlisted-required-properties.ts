import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-unlisted-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let prop of unlistedProperties">
        <app-create-edge
          [name]="generatePropertyName(prop)"
          [schema]="true"
          [required]="true"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreateUnlistedPropertiesComponent {
  @Input() schema!: JSONSchemaNS.Object;

  get unlistedProperties() {
    const required: string[] = (this.schema.required || []) as string[];
    const listedProperties = Object.keys(this.schema.properties || {});
    return required.filter((r) => !listedProperties.includes(r));
  }

  generatePropertyName(prop: string): string {
    return `<strong>${prop}</strong>`;
  }
}
