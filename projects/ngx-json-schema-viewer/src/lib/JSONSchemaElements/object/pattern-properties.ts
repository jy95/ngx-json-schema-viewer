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
      <ng-container *ngFor="let entry of patternPropertiesEntries">
        <jse-common-create-edge [schema]="entry[1]" [required]="false">
          <code name>
            {{ generatePropertyName(entry[0]) }}
          </code>
        </jse-common-create-edge>
      </ng-container>
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
