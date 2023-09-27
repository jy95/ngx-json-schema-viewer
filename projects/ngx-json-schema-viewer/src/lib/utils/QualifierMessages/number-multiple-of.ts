import { Component, Input } from '@angular/core';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-multiple-of',
  standalone: true,
  imports: [],
  template: `
    <div>
      <strong>{{ possibleValuesLabel }}</strong>&nbsp;
      <code>
        <ng-container>
          Possible values :
        </ng-container>
        <ng-container>
          multiple of {{ schema.multipleOf }}
        </ng-container>
      </code>
    </div>
  `,
})
export class MultipleOfComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  possibleValuesLabel = 'Possible values :';
}
