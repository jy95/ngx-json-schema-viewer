import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import type { JSONSchema } from '../../types';
import { PrintSchemaTypeComponent } from './print-schema-type';

@Component({
  selector: 'qm-content-encoding',
  standalone: true,
  imports: [NgIf,PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="schema">
      <div>
        <strong>Encoding :</strong>
        &nbsp;
        <lib-print-schema-type [obj]="schema.contentEncoding" />
      </div>
    </ng-container>
  `,
})
export class ContentEncodingComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
