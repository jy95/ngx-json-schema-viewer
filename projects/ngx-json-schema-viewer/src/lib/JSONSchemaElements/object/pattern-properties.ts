import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-pattern-properties',
  standalone: true,
  imports: [CommonModule,CreateEdgeComponent],
  template: `
    <ul>
      <li *ngFor="let entry of patternPropertiesEntries">
        <jse-common-create-edge [schema]="entry[1]!" [required]="false">
          <code name>
            {{ generatePropertyName(entry[0]) }}
          </code>
        </jse-common-create-edge>
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
    return `${key}`;
  }
}
