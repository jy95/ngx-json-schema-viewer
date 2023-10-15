import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { IfElseThenComponent } from "./if-else-then";
import { DependentRequiredComponent } from "./dependent-required";
import { DependentSchemasComponent } from "./dependent-schemas";
import { DependenciesComponent } from "./dependencies";

export {
  IfElseThenComponent,
  DependentRequiredComponent,
  DependentSchemasComponent,
  DependenciesComponent
}

import type { JSONSchema, JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-schema-conditional',
  standalone: true,
  imports: [
    CommonModule, 
    MatExpansionModule,
    IfElseThenComponent,
    DependentRequiredComponent,
    DependentSchemasComponent,
    DependenciesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-accordion>
        <mat-expansion-panel>
            <mat-expansion-panel-header>
                <mat-panel-title>
                    {{ schemaConditionalLabel }}
                </mat-panel-title>
            </mat-expansion-panel-header>
            <ng-template matExpansionPanelContent>
              <!-- Handles if-then-else case -->
              <ng-container *ngIf="isIfThenElse">
                <jse-schema-conditional-if-else-then [schema]="schema" />
              </ng-container>
              <!-- Handles dependentRequired case -->
              <ng-container *ngIf="isDependentRequired">
                <jse-schema-conditional-dependent-required [schema]="schema" />
              </ng-container>
              <!-- Handles dependentSchemas case -->
              <ng-container *ngIf="isDependentSchemas">
                <jse-schema-conditional-dependent-schemas [schema]="schema" />
              </ng-container>
              <!-- Handles dependencies (deprecated) -->
              <ng-container *ngIf="isDependencies">
                <jse-schema-conditional-dependencies [schema]="schema" />
              </ng-container>
            </ng-template>
        </mat-expansion-panel>
    </mat-accordion>
  `,
})
export class SchemaConditionalComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get isIfThenElse(): boolean {
    return this.schema.if !== undefined;
  }

  get isDependentRequired(): boolean {
    return (this.schema as JSONSchemaNS.Object).dependentRequired !== undefined;
  }

  get isDependentSchemas(): boolean {
    return (this.schema as JSONSchemaNS.Object).dependentSchemas !== undefined;
  }

  get isDependencies(): boolean {
    return this.schema.dependencies !== undefined;
  }

  get schemaConditionalLabel(): string {
    return "Conditional subschemas";
  }
}
