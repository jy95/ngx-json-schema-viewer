import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  AllOfSchemaComponent
} from "../schemaComposition/index";

import { DependentSchemasPipe } from '../../pipes/dependent-schemas.pipe';

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependent-schemas',
  standalone: true,
  imports: [
    AllOfSchemaComponent,
    DependentSchemasPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <jse-schema-composition-all-of [schema]="schema | dependentSchemas" />
  `,
})
export class DependentSchemasComponent {
  @Input({ required: true }) schema!: Record<string, JSONSchema>;
}
