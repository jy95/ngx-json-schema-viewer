import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-type',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong>
      type
    </strong>
  `,
})
export class TypeLabelComponent {}
