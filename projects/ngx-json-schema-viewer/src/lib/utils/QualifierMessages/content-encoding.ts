import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import type { JSONSchema } from '../../types';
import { PrintSchemaTypeComponent } from './print-schema-type';

@Component({
  selector: 'qm-content-encoding',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (schema) {
      <div>
        <strong>Encoding :</strong>
        &nbsp;
        <lib-print-schema-type [obj]="schema.contentEncoding" />
      </div>
    }
    `,
})
export class ContentEncodingComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
