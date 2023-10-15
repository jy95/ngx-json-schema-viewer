import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qm-nullable',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <span>❓&nbsp;</span>
      <ng-container>Nullable</ng-container>
    </div>
  `,
})
export class NullableComponent {}