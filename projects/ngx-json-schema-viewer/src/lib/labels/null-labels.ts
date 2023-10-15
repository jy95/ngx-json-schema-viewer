import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-null',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      null
    </span>
  `,
})
export class NullLabelComponent {}
