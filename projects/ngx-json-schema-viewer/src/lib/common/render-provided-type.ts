import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
    CreateArrayComponent,
    CreateObjectComponent,
    CreateStringComponent,
    CreateBooleanComponent,
    CreateNumberComponent,
    CreateIntegerComponent,
    CreateNullComponent
} from "../JSONSchemaElements/index";

import type {
    JSONSchema,
    JSONSchemaNS,
    TypeValues,
} from '../types';

@Component({
  selector: 'jse-common-render-provided-type',
  standalone: true,
  imports: [
    CommonModule,
    CreateArrayComponent,
    CreateObjectComponent,
    CreateStringComponent,
    CreateBooleanComponent,
    CreateNumberComponent,
    CreateIntegerComponent,
    CreateNullComponent
  ],
  template: `
    <ng-container [ngSwitch]="type">
      <jse-array
        *ngSwitchCase="'array'"
        [schema]="asTypedArray"
        [description]="description"
      />
      <jse-object
        *ngSwitchCase="'object'"
        [schema]="asTypedObject"
        [description]="description"
      />
      <jse-string
        *ngSwitchCase="'string'"
        [schema]="asTypedString"
        [description]="description"
      />
      <jse-boolean
        *ngSwitchCase="'boolean'"
        [schema]="asTypedBoolean"
        [description]="description"
      />
      <jse-number
        *ngSwitchCase="'number'"
        [schema]="asTypedNumber"
        [description]="description"
      />
      <jse-integer
        *ngSwitchCase="'integer'"
        [schema]="asTypedInteger"
        [description]="description"
      />
      <jse-null
        *ngSwitchDefault
        [schema]="asTypedNull"
        [description]="description"
      />
    <ng-container>
  `,
})
export class RenderProvidedTypeComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
  @Input({ required: true }) type!: TypeValues;
  @Input({ required: true }) description!: string;
  @Input() nullable?: boolean;

  get asTypedArray() : JSONSchemaNS.Array {
    return this.schema as JSONSchemaNS.Array;
  }

  get asTypedObject(): JSONSchemaNS.Object {
    return this.schema as JSONSchemaNS.Object;
  }

  get asTypedString(): JSONSchemaNS.String {
    return this.schema as JSONSchemaNS.String;
  }

  get asTypedBoolean(): JSONSchemaNS.Boolean {
    return this.schema as JSONSchemaNS.Boolean;
  }

  get asTypedNumber(): JSONSchemaNS.Number {
    return this.schema as JSONSchemaNS.Number;
  }

  get asTypedInteger(): JSONSchemaNS.Integer {
    return this.schema as JSONSchemaNS.Integer;
  }

  get asTypedNull(): JSONSchemaNS.Null {
    return this.schema as JSONSchemaNS.Null;
  }
}
