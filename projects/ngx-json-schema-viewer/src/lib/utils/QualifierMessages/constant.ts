import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-constant',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
      <strong>Constant value :</strong>
      &nbsp;
      <lib-print-schema-type [obj]="constValue" />
  </div>
  `
})
export class ConstantComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get constValue(): any {
    return this.schema.const;
  }
}
