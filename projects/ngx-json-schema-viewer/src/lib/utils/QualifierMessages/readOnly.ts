import { Component } from '@angular/core';

@Component({
  selector: 'qm-read-only',
  standalone: true,
  imports: [],
  template: `
    <div>
      🚨&nbsp;
      <strong>{{ readOnlyLabel }}</strong>
    </div>
  `,
})
export class ReadOnlyComponent {
  readOnlyLabel = 'read only';
}
