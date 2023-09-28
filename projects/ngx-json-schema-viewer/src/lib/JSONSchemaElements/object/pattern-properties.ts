import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CreateEdge } from "@theme/JSONSchemaViewer/components";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-pattern-properties',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let entry of patternPropertiesEntries">
        <app-create-edge
          [key]="'object_patternProperties_' + entry[0]"
          [name]="generatePropertyName(entry[0])"
          [schema]="entry[1]"
          [required]="false"
        ></app-create-edge>
      </li>
    </ul>
  `,
})
export class CreatePatternPropertiesComponent {
  @Input() schema!: JSONSchemaNS.Object;

  get patternPropertiesEntries() {
    return Object.entries(this.schema.patternProperties || {});
  }

  generatePropertyName(key: string): string {
    return `<code>${key}</code>`;
  }
}
