
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-string-length',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ lengthLabel }}</strong>&nbsp;
      @if (schema.minLength !== undefined) {
        <code>{{ '>= ' + schema.minLength + ' character(s)' }}</code>
      }
      @if (minAndMaxLength) {
        <span>&nbsp;&&nbsp;</span>
      }
      @if (schema.maxLength !== undefined) {
        <code>{{ '<= ' + schema.maxLength + ' character(s)' }}</code>
      }
    </div>
    `,
})
export class StringLengthComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  lengthLabel = 'Length :';
  
  get minAndMaxLength(): boolean {
    return this.schema.minLength !== undefined && this.schema.maxLength !== undefined;
  }

}
