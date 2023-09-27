import { Component } from '@angular/core';

@Component({
  selector: 'qm-no-extra-properties',
  standalone: true,
  imports: [],
  template: `
    <div>
      <span>🚨&nbsp;</span>
      <ng-container>No extra propertie(s) are authorized in this object</ng-container>
    </div>
  `,
})
export class NoExtraPropertiesComponent {}
