
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'labels-error-occurred',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (error) {
      <strong>Something bad happens : </strong> {{ error.message }}
    }
    `,
})
export class ErrorOccurredLabelComponent {
  @Input({ required: true }) error!: Error;
}
