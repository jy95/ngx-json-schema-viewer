import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';


import {
    CreateDescriptionComponent
} from "./index";

import {
    TypeLabelComponent,
    NullLabelComponent
} from "../labels/index";

import {
    QualifierMessages
} from "../utils/index";

import type { JSONSchemaNS } from '../types';


@Component({
  selector: 'jse-null',
  standalone: true,
  imports: [
    TypeLabelComponent,
    NullLabelComponent,
    forwardRef(() => CreateDescriptionComponent),
    QualifierMessages
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-null></labels-null>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      @if (description) {
        <jse-description [description]="description" />
      }
    </div>
    `,
})
export class CreateNullComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Null;
  @Input() description?: string;
}
