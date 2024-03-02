
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  DependentRequiredComponent,
  DependentSchemasComponent
} from "./index";

import { DependanciesToDependentRequiredPipe } from '../../pipes/dependancies-to-dependent-required.pipe';
import { DependanciesToDependentSchemasPipe } from '../../pipes/dependancies-to-dependent-schemas.pipe';

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependencies',
  standalone: true,
  imports: [
    DependentRequiredComponent,
    DependentSchemasComponent,
    DependanciesToDependentRequiredPipe,
    DependanciesToDependentSchemasPipe
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (schema | dependanciesTodependentRequired; as dependentRequired) {
      @if (!isEmptyObject(dependentRequired)) {
        <jse-schema-conditional-dependent-required [schema]="dependentRequired" />
      }
    }
    @if (schema | dependanciesTodependentSchemas; as dependentSchemas) {
      @if (!isEmptyObject(dependentSchemas)) {
        <jse-schema-conditional-dependent-schemas [schema]="dependentSchemas" />
      }
    }
    `,
})
export class DependenciesComponent {
  @Input({ required: true }) schema!: Record<string, string[] | readonly string[] | JSONSchema>;

  isEmptyObject(obj : Record<string, any>) : boolean {
    return Object.keys(obj).length === 0;
  }
}
