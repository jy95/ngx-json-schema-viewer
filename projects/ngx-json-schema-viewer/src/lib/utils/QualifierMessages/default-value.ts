import { Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

@Component({
  selector: 'qm-default-value',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  template: `
    <div>
      <strong>{{ defaultLabel }}</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.default" />
    </div>
  `,
})
export class DefaultValueComponent {
  @Input() schema: any; // You may need to adjust the type according to your JSONSchema type

  defaultLabel = 'Default value :';
}
