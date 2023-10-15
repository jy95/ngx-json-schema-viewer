import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-false',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
        none
    </span>
  `,
})
export class FalseLabelComponent {}