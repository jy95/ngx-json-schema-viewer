import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-boolean',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
        boolean
    </span>
  `,
})
export class BooleanLabelComponent {}
