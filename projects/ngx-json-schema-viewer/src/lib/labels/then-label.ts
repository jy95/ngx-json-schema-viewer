import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-then',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>
        Then
    </strong>
  `,
})
export class ThenLabelComponent {}
