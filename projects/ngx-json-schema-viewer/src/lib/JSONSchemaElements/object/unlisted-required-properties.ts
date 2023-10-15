import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="unlistedProperties.length > 0">
      <ul>
        <jse-common-create-edge
          [schema]="true"
          [required]="true"
          *ngFor="let prop of unlistedProperties"
        >
          <strong name>
            {{ generatePropertyName(prop) }}
          </strong>
        </jse-common-create-edge>
      </ul>
    </ng-container>
  `,
})
export class CreateUnlistedPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get unlistedProperties() : string[] {
    const required: string[] = (this.schema.required || []) as string[];
    const listedProperties = Object.keys(this.schema.properties || {});
    return required.filter((r) => !listedProperties.includes(r));
  }

  generatePropertyName(prop: string): string {
    return `${prop}`;
  }
}
