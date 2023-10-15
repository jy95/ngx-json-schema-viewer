import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-and',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>
    <strong>AND</strong>
    <ng-container *ngTemplateOutlet="spaceTemplate"></ng-container>

    <ng-template #spaceTemplate>
      &nbsp;
    </ng-template>
  `,
})
export class AndLabelComponent {}
