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
      <ng-container *ngFor="let entry of propertiesEntries">
        <jse-common-create-edge [schema]="entry[1]" [required]="isRequired(entry[0])">
          <strong name>
            {{ generatePropertyName(entry[0]) }}
          </strong>
        </jse-common-create-edge>
      </ng-container>
    </ul>
  `,
})
export class CreatePropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get propertiesEntries() : [string, JSONSchema][] {
    return Object.entries(this.schema.properties || {});
  }

  generatePropertyName(key: string): string {
    return `${key}`;
  }

  isRequired(key: string): boolean {
    return Array.isArray(this.schema.required) ? this.schema.required.includes(key) : false;
  }
}
