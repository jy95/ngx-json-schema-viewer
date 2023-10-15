import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-true',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      any
    </span>
  `,
})
export class TrueLabelComponent {}