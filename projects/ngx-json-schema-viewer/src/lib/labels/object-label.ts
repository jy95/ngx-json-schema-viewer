import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-object',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span style="opacity: 0.6">
      object
    </span>
  `,
})
export class ObjectLabelComponent {}
