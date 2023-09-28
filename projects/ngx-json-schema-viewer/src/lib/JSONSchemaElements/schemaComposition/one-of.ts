import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { GenerateFriendlyNameComponent } from "../../utils/index";
import { CreateNodesComponent } from "@theme/JSONSchemaViewer/components/create-nodes.component";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-composition-one-of',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GenerateFriendlyNameComponent],
  template: `
    <div>
      <span class="badge badge--info">{{ typeOf }}</span>
      <mat-tab-group>
        <mat-tab *ngFor="let compositeSchema of typedSchema">
          <ng-template mat-tab-label>
            <jsv-friendly-name [schema]="compositeSchema" />
          </ng-template>
          <app-create-nodes [schema]="compositeSchema"></app-create-nodes>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class OneOfSchemaComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): JSONSchema[] {
    return this.schema.oneOf! as JSONSchema[];
  }

  get typeOf(): string {
    return "oneOf";
  }

}
