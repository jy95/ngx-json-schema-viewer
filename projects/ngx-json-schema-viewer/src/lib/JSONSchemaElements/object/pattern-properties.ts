import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-object-pattern-properties',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="patternPropertiesEntries.length > 0">
      <jse-common-create-edge [schema]="entry[1]" [required]="false" *ngFor="let entry of patternPropertiesEntries">
        <code name>
          {{ generatePropertyName(entry[0]) }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreatePatternPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get patternPropertiesEntries() : [string, JSONSchema][] {
    return Object.entries(this.schema.patternProperties || {});
  }

  generatePropertyName(key: string): string {
    return `${key}`;
  }
}
