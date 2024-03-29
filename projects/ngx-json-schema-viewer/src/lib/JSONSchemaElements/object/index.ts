
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
      @if (schema.properties !== undefined) {
        <jse-object-properties [schema]="schema" />
      }
      @if (schema.patternProperties !== undefined) {
        <jse-object-pattern-properties [schema]="schema" />
      }
      @if (schema.propertyNames !== undefined) {
        <jse-object-property-names [schema]="schema" />
      }
      @if (schema.additionalProperties !== undefined) {
        <jse-object-additional-properties [schema]="schema" />
      }
      @if (schema.unevaluatedProperties !== undefined) {
        <jse-object-unevaluated-properties [schema]="schema" />
      }
      <div style="margin-top: 0.75rem;">
        <qm-messages [schema]="schema" />
      </div>
      @if (description) {
        <jse-description [description]="description" />
      }
    </div>
    `,
})
export class CreateObjectComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;
  @Input() description?: string;
}
