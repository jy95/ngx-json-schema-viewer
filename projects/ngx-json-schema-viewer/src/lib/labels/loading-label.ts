import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-loading',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
        Loading ....
    </div>
  `,
})
export class LoadingLabelComponent {}
