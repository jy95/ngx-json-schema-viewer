import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { GenerateFriendlyNameComponent } from "../../utils/index";
import { CreateNodesComponent } from "@theme/JSONSchemaViewer/components/create-nodes.component";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'app-all-of-schema',
  standalone: true,
  imports: [CommonModule, MatTabsModule, GenerateFriendlyNameComponent],
  template: `
    <div>
      <span class="badge badge--info">{{ typeOf }}</span>
      <mat-tab-group>
        <mat-tab *ngFor="let compositeSchema of typedSchema; let index = index" [label]="generateFriendlyName(compositeSchema)">
          <app-create-nodes [schema]="compositeSchema"></app-create-nodes>
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
