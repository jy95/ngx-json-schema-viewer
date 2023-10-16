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
    <ng-container *ngIf="schema | dependanciesTodependentRequired as dependentRequired">
      <jse-schema-conditional-dependent-required [schema]="dependentRequired" />
    </ng-container>
    <ng-container *ngIf="schema | dependanciesTodependentSchemas as dependentSchemas">
      <jse-schema-conditional-dependent-schemas [schema]="dependentSchemas" />
    </ng-container>
  `,
})
export class DependenciesComponent {
  @Input({ required: true }) schema!: Record<string, string[] | readonly string[] | JSONSchema>;
}
