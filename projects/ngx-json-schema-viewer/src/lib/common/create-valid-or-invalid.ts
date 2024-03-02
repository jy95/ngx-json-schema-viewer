
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
    CreateAlwaysInvalidComponent,
    CreateAlwaysValidComponent
} from "../JSONSchemaElements/index";

import type { JSONSchema } from '../types';

@Component({
  selector: 'jse-common-create-valid-or-invalid',
  standalone: true,
  imports: [
    forwardRef(() => CreateAlwaysInvalidComponent),
    forwardRef(() => CreateAlwaysValidComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (schema) {
      <jse-always-valid [schema]="schema" />
    } @else {
      <jse-always-invalid />
    }
    `,
})
export class CreateValidOrInvalidComponent {
  @Input({ required: true }) schema!: JSONSchema;
}
