import { NgIf } from '@angular/common';
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
    NgIf,
    DependentRequiredComponent,
    DependentSchemasComponent,
    DependanciesToDependentRequiredPipe,
    DependanciesToDependentSchemasPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="schema | dependanciesTodependentRequired as dependentRequired">
      <ng-container *ngIf="!isEmptyObject(dependentRequired)">
        <jse-schema-conditional-dependent-required [schema]="dependentRequired" />
      </ng-container>
    </ng-container>
    <ng-container *ngIf="schema | dependanciesTodependentSchemas as dependentSchemas">
      <ng-container *ngIf="!isEmptyObject(dependentSchemas)">
        <jse-schema-conditional-dependent-schemas [schema]="dependentSchemas" />
      </ng-container>
    </ng-container>
  `,
})
export class DependenciesComponent {
  @Input({ required: true }) schema!: Record<string, string[] | readonly string[] | JSONSchema>;

  isEmptyObject(obj : Record<string, any>) : boolean {
    return Object.keys(obj).length === 0;
  }
}
