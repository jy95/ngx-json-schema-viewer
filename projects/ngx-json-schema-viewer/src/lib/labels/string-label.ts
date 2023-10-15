import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-string',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      string
    </span>
  `,
})
export class StringLabelComponent {}
