import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import type { JSONSchema } from '../../types';

@Component({
    selector: 'qm-pattern',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div>
        <strong>{{ patternLabel }}</strong>&nbsp;
        <code>{{ pattern }}</code>
      </div>
    `,
  })
  export class PatternComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
    patternLabel = 'Pattern :';

    get pattern(): string {
      return this.schema.pattern!;
    }
  }
