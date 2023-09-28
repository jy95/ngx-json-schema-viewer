import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { 
    TypeLabelComponent,
    ArrayLabelComponent
 } from "../../labels/index";
import { 
    CreateDescriptionComponent
 } from "../index";
import { CreatePrefixItemsComponent } from "./prefix-items";
import { CreateItemsComponent } from "./items";
import { CreateAdditionalItemsComponent } from "./additional-items";
import { CreateUnevaluatedItemsComponent } from "./unevaluated-items";
import { CreateContainsComponent } from "./contains";

import { QualifierMessages } from "../../utils/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-array',
  standalone: true,
  imports: [
    CommonModule, 
    TypeLabelComponent, 
    ArrayLabelComponent,
    CreateDescriptionComponent,
    QualifierMessages,
    CreateAdditionalItemsComponent,
    CreateContainsComponent,
    CreateItemsComponent,
    CreatePrefixItemsComponent,
    CreateUnevaluatedItemsComponent
  ],
  template: `
    <div>
      <labels-type />
      &nbsp;&#58;&nbsp;
      <labels-array />
      <jse-array-prefix-items [schema]="schema" />
      <jse-array-items [schema]="schema" />
      <jse-array-additional-items [schema]="schema" />
      <jse-array-unevaluated-items [schema]="schema" />
      <jse-array-contains [schema]="schema" />
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      <ng-container *ngIf="description">
        <jse-description [description]="description"></jse-description>
      </ng-container>
    </div>
  `,
})
export class CreateArrayComponent {
  @Input() schema!: JSONSchemaNS.Array;
  @Input() description?: string;
}
