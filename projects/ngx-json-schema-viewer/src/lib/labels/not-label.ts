import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-not',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>
      NOT
    </strong>
  `,
})
export class NotLabelComponent {}
