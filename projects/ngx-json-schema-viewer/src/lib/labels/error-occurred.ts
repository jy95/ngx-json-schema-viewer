import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'labels-error-occurred',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="error">
      <strong>Something bad happens : </strong> {{ error.message }}
    </ng-container>
  `,
})
export class ErrorOccurredLabelComponent {
  @Input() error!: Error;
}
