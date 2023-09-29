import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { JSONSchema } from '../../types';
import { PrintSchemaTypeComponent } from './print-schema-type';

@Component({
  selector: 'qm-content-encoding',
  standalone: true,
  imports: [CommonModule,PrintSchemaTypeComponent],
  template: `
    <div *ngIf="schema" key="contentEncoding">
      <strong>Encoding :</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.contentEncoding"] />
    </div>
  `,
})
export class ContentEncodingComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
