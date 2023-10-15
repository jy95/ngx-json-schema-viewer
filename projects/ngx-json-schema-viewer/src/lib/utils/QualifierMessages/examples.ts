import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

type itemsType = { id: number; value: unknown; label: string }[]

@Component({
  selector: 'qm-examples',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule, 
    PrintSchemaTypeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="items.length > 0">
      <strong>{{ examplesLabel }}</strong>&nbsp;
      <mat-tab-group>
        <mat-tab *ngFor="let item of items" [label]="item.label">
            <lib-print-schema-type [obj]="item.value" />
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class ExamplesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  examplesLabel = 'Example values :';

  get items(): itemsType {
    return (this.schema.examples || [])
      .map((val, idx) => ({
        id: idx,
        value: val,
        label: `Example ${idx}`,
    }));
  }

}
