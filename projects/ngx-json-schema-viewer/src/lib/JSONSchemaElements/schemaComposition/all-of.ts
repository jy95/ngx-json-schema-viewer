import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { GenerateFriendlyNameComponent } from "../../utils/index";
import { CreateNodesComponent } from "../../common/create-nodes";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-composition-all-of',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GenerateFriendlyNameComponent, CreateNodesComponent],
  template: `
    <div>
      <span class="badge badge--info">{{ typeOf }}</span>
      <mat-tab-group>
        <mat-tab *ngFor="let compositeSchema of typedSchema">
          <ng-template mat-tab-label>
            <jsv-friendly-name [schema]="compositeSchema" />
          </ng-template>
          <jse-common-create-nodes [schema]="compositeSchema" />
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class AllOfSchemaComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): JSONSchema[] {
    return this.schema.allOf! as JSONSchema[];
  }

  get typeOf(): string {
    return "allOf";
  }

}
