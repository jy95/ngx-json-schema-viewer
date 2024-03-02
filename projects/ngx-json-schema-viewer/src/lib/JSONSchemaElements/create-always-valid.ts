
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
    TypeLabelComponent,
    TrueLabelComponent
} from "../labels/index";

import {
  CreateDescriptionComponent
} from "./index";

import {
  QualifierMessages
} from "../utils/index";

import type { JSONSchema } from '../types';


@Component({
  selector: 'jse-always-valid',
  standalone: true,
  imports: [
    TypeLabelComponent,
    TrueLabelComponent,
    QualifierMessages,
    forwardRef(() => CreateDescriptionComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <labels-type></labels-type>
      &nbsp;&#58;&nbsp;
      <labels-true></labels-true>
      <div style="margin-top: 0.75rem;">
        {{ "Always valid" }}
      </div>
      @if (notBoolean) {
        <div style="margin-top: 0.75rem;">
          <qm-messages [schema]="typedSchema" />
        </div>
      }
      @if (description) {
        <jse-description [description]="description" />
      }
    </div>
    `,
})
export class CreateAlwaysValidComponent {
  @Input({ required: true }) schema!: JSONSchema;

  get notBoolean(): boolean {
    return typeof this.schema !== "boolean";
  }

  get typedSchema(): Exclude<JSONSchema, true | false> {
    return this.schema as Exclude<JSONSchema, true | false>;
  }

  get description(): string | undefined {
    return typeof this.schema !== "boolean" ? this.schema.description : undefined;
  }
}
