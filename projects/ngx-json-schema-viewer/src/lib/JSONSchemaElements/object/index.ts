import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import { CreateUnlistedPropertiesComponent } from "./unlisted-required-properties";
import { CreatePropertiesComponent } from "./properties";
import { CreatePatternPropertiesComponent } from "./pattern-properties";
import { PropertyNamesComponent } from "./property-names";
import { CreateAdditionalPropertiesComponent } from "./additional-properties";
import { CreateUnevaluatedPropertiesComponent } from "./unevaluated-properties";

import { QualifierMessages } from "../../utils/index";

import { 
    ObjectLabelComponent,
    TypeLabelComponent
} from "../../labels/index";

import { CreateDescriptionComponent } from "../index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object',
  standalone: true,
  imports: [
    CommonModule,
    QualifierMessages,
    CreateUnlistedPropertiesComponent,
    CreatePropertiesComponent,
    CreatePatternPropertiesComponent,
    PropertyNamesComponent,
    CreateAdditionalPropertiesComponent,
    CreateUnevaluatedPropertiesComponent,
    ObjectLabelComponent,
    TypeLabelComponent,
    forwardRef(() => CreateDescriptionComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type />
      &nbsp;&#58;&nbsp;
      <labels-object />
      <jse-object-unlisted-properties [schema]="schema" />
      <ng-container *ngIf="schema.properties !== undefined">
        <jse-object-properties [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.patternProperties !== undefined">
        <jse-object-pattern-properties [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.propertyNames !== undefined">
        <jse-object-property-names [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.additionalProperties !== undefined">
        <jse-object-additional-properties [schema]="schema" />
      </ng-container>
      <ng-container *ngIf="schema.unevaluatedProperties !== undefined">
        <jse-object-unevaluated-properties [schema]="schema" />
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
export class CreateObjectComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;
  @Input() description?: string;
}
