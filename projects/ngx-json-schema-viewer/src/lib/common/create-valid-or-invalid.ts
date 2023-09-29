import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';

import {
    CreateAlwaysInvalidComponent,
    CreateAlwaysValidComponent
} from "../JSONSchemaElements/index";

import type { JSONSchema } from '../types';

@Component({
  selector: 'jse-common-create-valid-or-invalid',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateAlwaysInvalidComponent),
    forwardRef(() => CreateAlwaysValidComponent),
  ],
  template: `
    <ng-container *ngIf="schema; else alwaysInvalid">
      <jse-always-valid />
    </ng-container>
    <ng-template #alwaysInvalid>
      <jse-always-invalid />
    </ng-template>
  `,
})
export class CreateValidOrInvalidComponent {
  @Input({ required: true }) schema!: JSONSchema;
}
