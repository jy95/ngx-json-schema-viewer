import { CommonModule } from '@angular/common';
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
    CommonModule,
    DependentRequiredComponent,
    DependentSchemasComponent,
    DependanciesToDependentRequiredPipe,
    DependanciesToDependentSchemasPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="hasDependentRequired">
      <jse-schema-conditional-dependent-required [schema]="schema | dependanciesTodependentRequired" />
    </ng-container>
    <ng-container *ngIf="hasDependentSchemas">
      <jse-schema-conditional-dependent-schemas [schema]="schema | dependanciesTodependentSchemas" />
    </ng-container>
  `,
})
export class DependenciesComponent {
  @Input({ required: true }) schema!: Record<string, string[] | readonly string[] | JSONSchema>;

  get hasDependentRequired(): boolean {
    return Object.values(this.schema).some(Array.isArray);
  }
  
  get hasDependentSchemas(): boolean {
    return Object.values(this.schema).some((subSchema) => !Array.isArray(subSchema));
  }
}
