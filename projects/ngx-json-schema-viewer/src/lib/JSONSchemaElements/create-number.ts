import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';


import {
    CreateDescriptionComponent
} from "./index";

import {
    TypeLabelComponent,
    NumberLabelComponent
} from "../labels/index";

import {
    QualifierMessages
} from "../utils/index";

import type { JSONSchemaNS } from '../types';


@Component({
  selector: 'jse-number',
  standalone: true,
  imports: [
    TypeLabelComponent,
    NumberLabelComponent,
    forwardRef(() => CreateDescriptionComponent),
    QualifierMessages
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-number></labels-number>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      @if (description) {
        <jse-description [description]="description" />
      }
    </div>
    `,
})
export class CreateNumberComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Number;
  @Input() description?: string;
}
