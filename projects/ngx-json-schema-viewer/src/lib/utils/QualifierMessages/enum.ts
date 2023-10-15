import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-enum',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ enumLabel }}</strong>
      &nbsp;
      <lib-print-schema-type [obj]="enumValue" />
    </div>
  `,
})
export class EnumComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  enumLabel = 'Possible values :';

  get enumValue(): unknown {
    return this.schema.enum;
  }
}
