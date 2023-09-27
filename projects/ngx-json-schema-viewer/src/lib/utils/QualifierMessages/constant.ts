import { Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-constant',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  template: `
  <div>
      <strong>Constant value :</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.const" />
  </div>
  `
})
export class ConstantComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;
}
