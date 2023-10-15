import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'jse-description',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="margin-top: 0.75rem;">
      {{ description }}
    </div>
  `,
})
export class CreateDescriptionComponent {
  @Input({ required: true }) description!: string;
}
