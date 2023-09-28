import { Component, Input } from '@angular/core';

@Component({
  selector: 'jse-description',
  standalone: true,
  imports: [],
  template: `
    <div style="margin-top: 0.75rem;">
      {{ description }}
    </div>
  `,
})
export class CreateDescriptionComponent {
  @Input() description!: string;
}
