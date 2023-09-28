import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DependentRequiredComponent } from "@theme/JSONSchemaViewer/JSONSchemaElements/SchemaConditional/dependent-required.component";
import { DependentSchemasComponent } from "@theme/JSONSchemaViewer/JSONSchemaElements/SchemaConditional/dependent-schemas.component";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-dependencies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="hasDependentRequired">
      <app-dependent-required [schema]="dependentRequired"></app-dependent-required>
    </div>
    <div *ngIf="hasDependentSchemas">
      <app-dependent-schemas [schema]="dependentSchemas"></app-dependent-schemas>
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
