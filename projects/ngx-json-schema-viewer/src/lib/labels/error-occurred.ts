import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'labels-error-occurred',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="error">
      <strong>Something bad happens : </strong> {{ error.message }}
    </ng-container>
  `,
})
export class ErrorOccurredLabelComponent {
  @Input({ required: true }) error!: Error;
}
