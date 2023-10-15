import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-default-value',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ defaultLabel }}</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.default" />
    </div>
  `,
})
export class DefaultValueComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  defaultLabel = 'Default value :';
}
