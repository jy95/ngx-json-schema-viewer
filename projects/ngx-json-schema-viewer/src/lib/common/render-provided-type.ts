import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

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
    forwardRef(() => CreateArrayComponent),
    forwardRef(() => CreateObjectComponent),
    forwardRef(() => CreateStringComponent),
    forwardRef(() => CreateBooleanComponent),
    forwardRef(() => CreateNumberComponent),
    forwardRef(() => CreateIntegerComponent),
    forwardRef(() => CreateNullComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (type) {
      @case ("array") {
        <jse-array
          [schema]="asTypedArray"
          [description]="description"
        />
      }
      @case ("object") {
        <jse-object
          [schema]="asTypedObject"
          [description]="description"
        />
      }
      @case ("string") {
        <jse-string
          [schema]="asTypedString"
          [description]="description"
        />
      }
      @case ("boolean") {
        <jse-boolean
          [schema]="asTypedBoolean"
          [description]="description"
        />
      }
      @case ("number") {
        <jse-number
          [schema]="asTypedNumber"
          [description]="description"
        />
      }
      @case ("integer") {
        <jse-integer
          [schema]="asTypedInteger"
          [description]="description"
        />
      }
      @default {
        <jse-null
          [schema]="asTypedNull"
          [description]="description"
        />
      }
    }
  `,
})
export class RenderProvidedTypeComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
  @Input({ required: true }) type!: TypeValues;
  @Input() nullable?: boolean;

  get description(): string | undefined {
    return this.schema.description;
  }

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
