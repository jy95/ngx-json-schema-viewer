import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CreateDescriptionComponent
} from "./index";

import {
    TypeLabelComponent,
    StringLabelComponent
} from "../labels/index";

import {
    QualifierMessages
} from "../utils/index";

import type { JSONSchemaNS } from '../types';


@Component({
  selector: 'jse-string',
  standalone: true,
  imports: [
    TypeLabelComponent, 
    StringLabelComponent,
    forwardRef(() => CreateDescriptionComponent),
    CommonModule,
    QualifierMessages
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-string></labels-string>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      <jse-description [description]="description" *ngIf="description" />
    </div>
  `,
})
export class CreateStringComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.String;
  @Input() description?: string;
}
