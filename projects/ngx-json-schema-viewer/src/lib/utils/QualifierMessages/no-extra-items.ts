import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qm-no-extra-items',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <span>🚨&nbsp;</span>
      <ng-container>No extra item(s) are authorized in this array</ng-container>
    </div>
  `,
})
export class NoExtraItemsComponent {}
