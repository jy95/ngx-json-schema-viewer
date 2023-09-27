import { Component } from '@angular/core';

@Component({
  selector: 'qm-write-only',
  standalone: true,
  imports: [],
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
