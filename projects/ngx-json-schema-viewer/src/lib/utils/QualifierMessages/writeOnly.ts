import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qm-write-only',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      🚨&nbsp;
      <strong>{{ writeOnlyLabel }}</strong>
    </div>
  `,
})
export class WriteOnlyComponent {
  writeOnlyLabel = 'write only';
}
