import { Component, Input } from '@angular/core';

import type { JSONSchema } from '../../types';

@Component({
    selector: 'qm-pattern',
    standalone: true,
    imports: [],
    template: `
      <div>
        <strong>{{ patternLabel }}</strong>&nbsp;
        <code>{{ schema.pattern }}</code>
      </div>
    `,
  })
  export class PatternComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
    patternLabel = 'Pattern :';
  }
