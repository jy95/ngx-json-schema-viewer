import { Component } from '@angular/core';

@Component({
  selector: 'labels-xor',
  standalone: true,
  imports: [],
  template: `
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>
    <strong>XOR</strong>
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>

    <ng-template #spaceTemplate>
      &nbsp;
    </ng-template>
  `,
})
export class XorLabelComponent {}
