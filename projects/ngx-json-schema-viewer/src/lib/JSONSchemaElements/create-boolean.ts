import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CreateDescriptionComponent
} from "./index";

import {
    TypeLabelComponent,
    BooleanLabelComponent
} from "../labels/index";

import {
    QualifierMessages
} from "../utils/index";

import type { JSONSchemaNS } from '../types';


@Component({
  selector: 'jse-boolean',
  standalone: true,
  imports: [
    TypeLabelComponent, 
    BooleanLabelComponent,
    forwardRef(() => CreateDescriptionComponent),
    CommonModule,
    QualifierMessages
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-boolean></labels-boolean>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      <ng-container *ngIf="description">
        <jse-description [description]="description" />
      </ng-container>
    </div>
  `,
})
export class CreateBooleanComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Boolean;
  @Input() description?: string;
}
