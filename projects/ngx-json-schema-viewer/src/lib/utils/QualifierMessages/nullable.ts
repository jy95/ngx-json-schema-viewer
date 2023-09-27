import { Component } from '@angular/core';

@Component({
  selector: 'qm-nullable',
  standalone: true,
  imports: [],
  template: `
    <div>
      <span>❓&nbsp;</span>
      <ng-container>Nullable</ng-container>
    </div>
  `,
})
export class NullableComponent {}