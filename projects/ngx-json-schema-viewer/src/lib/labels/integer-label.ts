import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-integer',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      integer
    </span>
  `,
})
export class IntegerLabelComponent {}
