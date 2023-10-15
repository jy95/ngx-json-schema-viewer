import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AllOfSchemaComponent } from "./all-of";
import { AnyOfSchemaComponent } from "./any-of";
import { NotSchemaComponent } from "./not";
import { OneOfSchemaComponent } from "./one-of";

export {
  AllOfSchemaComponent,
  AnyOfSchemaComponent,
  NotSchemaComponent,
  OneOfSchemaComponent
}

import type {
    JSONSchema
} from "../../types";

@Component({
  selector: 'jse-schema-composition',
  standalone: true,
  imports: [
    CommonModule,
    AllOfSchemaComponent,
    AnyOfSchemaComponent,
    NotSchemaComponent,
    OneOfSchemaComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <jse-schema-composition-one-of [schema]="schema" *ngIf="schema.oneOf" />
    <jse-schema-composition-any-of [schema]="schema" *ngIf="schema.anyOf" />
    <jse-schema-composition-all-of [schema]="schema" *ngIf="schema.allOf" />
    <jse-schema-composition-not [schema]="schema" *ngIf="schema.not" />
  `,
})
export class SchemaCompositionComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
