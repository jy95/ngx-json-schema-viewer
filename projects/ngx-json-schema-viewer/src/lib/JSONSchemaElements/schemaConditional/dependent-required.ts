import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  AllOfSchemaComponent
} from "../schemaComposition/index";

import type { JSONSchema, JSONSchemaNS } from "../../types";
import { DependentRequiredPipe } from '../../pipes/dependent-required.pipe';

@Component({
  selector: 'jse-schema-conditional-dependent-required',
  standalone: true,
  imports: [
    AllOfSchemaComponent,
    DependentRequiredPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <jse-schema-composition-all-of [schema]="schema | dependentRequired" />
  `,
})
export class DependentRequiredComponent {
  @Input({ required: true }) schema!: Record<string, string[] | readonly string[]>;
}
