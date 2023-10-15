import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-array',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
        array
    </span>
  `,
})
export class ArrayLabelComponent {}
