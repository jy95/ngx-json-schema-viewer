import { Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-enum',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  template: `
    <div>
      <strong>{{ enumLabel }}</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.enum" />
    </div>
  `,
})
export class EnumQualifierMessageComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  enumLabel = 'Possible values :';
}
