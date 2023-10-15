import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
    TypeLabelComponent,
    FalseLabelComponent
} from "../labels/index";

@Component({
  selector: 'jse-always-invalid',
  standalone: true,
  imports: [TypeLabelComponent, FalseLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-false></labels-false>
      <div style="margin-top: 0.75rem;">
        {{ "Always invalid" }}
      </div>
    </div>
  `,
})
export class CreateAlwaysInvalidComponent {
}
