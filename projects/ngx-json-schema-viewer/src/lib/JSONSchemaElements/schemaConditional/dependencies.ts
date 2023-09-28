import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  DependentRequiredComponent,
  DependentSchemasComponent
} from "./index";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependencies',
  standalone: true,
  imports: [CommonModule,DependentRequiredComponent,DependentSchemasComponent],
  template: `
    <div *ngIf="hasDependentRequired">
      <jse-schema-conditional-dependent-required [schema]="dependentRequired" />
    </div>
    <div *ngIf="hasDependentSchemas">
      <jse-schema-conditional-dependent-schemas [schema]="dependentSchemas" />
    </div>
  `,
})
export class DependenciesComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get hasDependentRequired(): boolean {
    return (
      !!this.schema.dependencies &&
      Object.values(this.schema.dependencies).some(Array.isArray)
    );
  }
  
  get hasDependentSchemas(): boolean {
    return (
      !!this.schema.dependencies &&
      Object.values(this.schema.dependencies).some((subSchema) => !Array.isArray(subSchema))
    );
  }

  get dependentRequired(): { dependentRequired: Record<string, string[] | readonly string[]> } {
    const result: Record<string, string[] | readonly string[]> = {};

    if (this.schema.dependencies) {
      for (const [property, subSchema] of Object.entries(this.schema.dependencies)) {
        if (Array.isArray(subSchema)) {
          // dependentRequired case
          result[property] = subSchema;
        }
      }
    }

    return { dependentRequired: result };
  }

  get dependentSchemas(): { dependentSchemas: Record<string, JSONSchema> } {
    const result: Record<string, JSONSchema> = {};

    if (this.schema.dependencies) {
      for (const [property, subSchema] of Object.entries(this.schema.dependencies)) {
        if (!Array.isArray(subSchema)) {
          // dependentSchemas case
          result[property] = subSchema as JSONSchema;
        }
      }
    }

    return { dependentSchemas: result };
  }
}
