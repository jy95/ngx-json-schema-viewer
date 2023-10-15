import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-number',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      number
    </span>
  `,
})
export class NumberLabelComponent {}
