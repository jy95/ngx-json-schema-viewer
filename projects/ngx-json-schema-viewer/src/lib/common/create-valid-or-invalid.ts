import { NgIf } from '@angular/common';
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
    NgIf,
    forwardRef(() => CreateAlwaysInvalidComponent),
    forwardRef(() => CreateAlwaysValidComponent),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="schema; else alwaysInvalid">
      <jse-always-valid [schema]="schema" />
    </ng-container>
    <ng-template #alwaysInvalid>
      <jse-always-invalid />
    </ng-template>
  `,
})
export class CreateValidOrInvalidComponent {
  @Input({ required: true }) schema!: JSONSchema;
}
