import { Component } from '@angular/core';

import {
    TypeLabelComponent,
    TrueLabelComponent
} from "../labels/index";

@Component({
  selector: 'jse-always-valid',
  standalone: true,
  imports: [TypeLabelComponent, TrueLabelComponent],
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-true></labels-true>
      <div style="margin-top: 0.75rem;">
        {{ "Always valid" }}
      </div>
    </div>
  `,
})
export class CreateAlwaysValidComponent {
}
