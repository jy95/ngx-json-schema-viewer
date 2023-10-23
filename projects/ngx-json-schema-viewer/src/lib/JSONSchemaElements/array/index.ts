import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

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
    NgIf, 
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type />
      &nbsp;&#58;&nbsp;
      <labels-array />
      <ng-container *ngIf="schema.prefixItems !== undefined">
        <jse-array-prefix-items [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.items !== undefined">
        <jse-array-items [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.additionalItems !== undefined">
        <jse-array-additional-items [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.unevaluatedItems !== undefined">
        <jse-array-unevaluated-items [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.contains !== undefined">
        <jse-array-contains [schema]="schema" />
      </ng-container>
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      <ng-container *ngIf="description">
        <jse-description [description]="description" />
      </ng-container>
    </div>
  `,
})
export class CreateArrayComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;
  @Input() description?: string;
}
