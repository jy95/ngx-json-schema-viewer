import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';
import { ExamplesListPipe } from "../../pipes/examples-list.pipe";

type itemsType = { id: number; value: unknown; label: string }[]

@Component({
    selector: 'qm-examples',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-container *ngIf="schema | examplesList as items">
      <div>
        <strong>{{ examplesLabel }}</strong>
        <mat-tab-group>
          <ng-container *ngFor="let item of items">
            <mat-tab>
              <ng-template mat-tab-label>
                {{ item.label }}
              </ng-template>
              <lib-print-schema-type [obj]="item.value" />
            </mat-tab>
          </ng-container>
        </mat-tab-group>
      </div>
    </ng-container>
  `,
    imports: [
        CommonModule,
        MatTabsModule,
        PrintSchemaTypeComponent,
        ExamplesListPipe
    ]
})
export class ExamplesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  examplesLabel = 'Example values :';

}
