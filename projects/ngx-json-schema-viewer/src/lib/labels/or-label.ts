import { Component } from '@angular/core';

@Component({
  selector: 'labels-or',
  standalone: true,
  imports: [],
  template: `
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>
    <strong>OR</strong>
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>

    <ng-template #spaceTemplate>
      &nbsp;
    </ng-template>
  `,
})
export class OrLabelComponent {}
