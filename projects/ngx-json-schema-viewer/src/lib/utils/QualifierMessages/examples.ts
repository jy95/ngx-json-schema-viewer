import { Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'app-examples-qualifier-message',
  standalone: true,
  imports: [MatTabsModule, PrintSchemaTypeComponent],
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
export class ExamplesQualifierMessageComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  examplesLabel = 'Example values :';

  items: { id: number; value: any; label: string }[] = [];

  ngOnInit() {
    if (this.schema.examples) {
      this.items = this.schema.examples.map((val, idx) => ({
        id: idx,
        value: val,
        label: `Example ${idx}`,
      }));
    }
  }
}
