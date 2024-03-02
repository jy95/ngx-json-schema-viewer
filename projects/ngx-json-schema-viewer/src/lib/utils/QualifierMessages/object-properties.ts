import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-object-properties',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ lengthLabel }}</strong>&nbsp;
      @if (schema.minProperties !== undefined) {
        <code>
          {{ '>= ' + schema.minProperties + ' propertie(s)' }}
        </code>
      }
      @if (minAndMax) {
        <span>&nbsp;&&nbsp;</span>
      }
      @if (schema.maxProperties !== undefined) {
        <code>
          {{ '<= ' + schema.maxProperties + ' propertie(s)' }}
        </code>
      }
    </div>
    `,
})
export class ObjectPropertiesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
  lengthLabel = 'Length :';

  get minAndMax(): boolean {
    return this.schema.minProperties !== undefined && this.schema.maxProperties !== undefined; 
  }

}
