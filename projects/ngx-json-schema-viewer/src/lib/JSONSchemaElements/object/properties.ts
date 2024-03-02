import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-object-properties',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (entry of schema.properties | keyvalue; track entry) {
        <jse-common-create-edge [schema]="entry.value" [required]="isRequired(entry.key)">
          <strong name>
            {{ generatePropertyName(entry.key) }}
          </strong>
        </jse-common-create-edge>
      }
    </ul>
    `,
})
export class CreatePropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  generatePropertyName(key: string): string {
    return `${key}`;
  }

  isRequired(key: string): boolean {
    return Array.isArray(this.schema.required) ? this.schema.required.includes(key) : false;
  }
}
