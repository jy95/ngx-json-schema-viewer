import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qm-deprecated',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <span>🚨&nbsp;</span>
      <ng-container>Deprecated</ng-container>
    </div>
  `,
})
export class DeprecatedComponent {}