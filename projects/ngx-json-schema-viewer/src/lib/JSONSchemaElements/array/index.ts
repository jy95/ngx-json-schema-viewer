import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

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
    forwardRef(() => CreateDescriptionComponent),
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
      <jse-array-prefix-items [schema]="schema" *ngIf="schema.prefixItems !== undefined" />
      <jse-array-items [schema]="schema" *ngIf="schema.items !== undefined"/>
      <jse-array-additional-items [schema]="schema" *ngIf="schema.additionalItems !== undefined" />
      <jse-array-unevaluated-items [schema]="schema" *ngIf="schema.unevaluatedItems !== undefined" />
      <jse-array-contains [schema]="schema" *ngIf="schema.contains !== undefined"/>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      <jse-description [description]="description" *ngIf="description"/>
    </div>
  `,
})
export class CreateArrayComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;
  @Input() description?: string;
}
