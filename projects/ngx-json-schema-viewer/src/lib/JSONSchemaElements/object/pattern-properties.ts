import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (entry of schema.patternProperties | keyvalue; track entry) {
        <jse-common-create-edge [schema]="entry.value" [required]="false">
          <code name>
            {{ generatePropertyName(entry.key) }}
          </code>
        </jse-common-create-edge>
      }
    </ul>
    `,
})
export class CreatePatternPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  generatePropertyName(key: string): string {
    return `${key}`;
  }
}
