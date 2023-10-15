import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-else',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>
        Else
    </strong>
  `,
})
export class ElseLabelComponent {}
