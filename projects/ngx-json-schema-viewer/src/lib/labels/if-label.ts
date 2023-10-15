import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-if',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>
        If
    </strong>
  `,
})
export class IfLabelComponent {}
