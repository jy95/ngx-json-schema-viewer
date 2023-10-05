import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-examples',
  standalone: true,
  imports: [MatTabsModule, PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ examplesLabel }}</strong>&nbsp;
      <mat-tab-group>
        <mat-tab *ngFor="let item of items" [label]="item.label">
            <lib-print-schema-type [obj]="item.value"></lib-print-schema-type>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class ExamplesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  examplesLabel = 'Example values :';

  items: { id: number; value: any; label: string }[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.schema.examples) {
      this.items = this.schema.examples.map((val, idx) => ({
        id: idx,
        value: val,
        label: `Example ${idx}`,
      }));

      this.cdRef.markForCheck();
    }
  }
}
