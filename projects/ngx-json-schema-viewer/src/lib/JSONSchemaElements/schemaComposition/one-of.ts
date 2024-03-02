
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { GenerateFriendlyNameComponent } from "../../utils/index";
import { CreateNodesComponent } from "../../common/create-nodes";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-composition-one-of',
  standalone: true,
  imports: [
    MatTabsModule,
    forwardRef(() => GenerateFriendlyNameComponent),
    forwardRef(() => CreateNodesComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <span class="badge oneOf">{{ typeOf }}</span>
      <mat-tab-group>
        @for (compositeSchema of typedSchema; track compositeSchema) {
          <mat-tab>
            <ng-template mat-tab-label>
              <jsv-friendly-name [schema]="compositeSchema" />
            </ng-template>
            <jse-common-create-nodes [schema]="compositeSchema" />
          </mat-tab>
        }
      </mat-tab-group>
    </div>
    `,
  styleUrls: ["./one-of.css"]
})
export class OneOfSchemaComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): JSONSchema[] {
    return this.schema.oneOf! as JSONSchema[];
  }

  get typeOf(): string {
    return "oneOf";
  }

}
