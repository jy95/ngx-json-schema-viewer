import { Component, OnInit, Input } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// services
import { SchemaResolutionService } from './services/schema-resolver';

import type { JSONSchema } from './types';
import type { IResolveOpts } from "@stoplight/json-ref-resolver/types"

@Component({
  selector: 'ngx-json-schema-viewer',
  template: `
    <!-- Error ... -->
    <div *ngIf="error !== undefined">
      <labels-error-occurred [error]="error!"/>
    </div>
    <!-- Loading ... -->
    <div *ngIf="resolvedSchema === undefined && error === undefined">
      <labels-loading />
    </div>

    <!-- Schema -->
    <div *ngIf="resolvedSchema !== undefined">
      <mat-accordion>
        <mat-expansion-panel-header>
          <mat-panel-title>
            <strong>
              {{ getSchemaTitle }}
            </strong>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <jse-common-create-nodes [schema]="resolvedSchema" />
      </mat-accordion>
    </div>
  `,
  styles: [
  ]
})
export class NgxJsonSchemaViewerComponent implements OnInit {
  @Input({ required: true }) schema: unknown;
  @Input() resolverOptions?: IResolveOpts;
  resolvedSchema: JSONSchema = false;
  error: Error | undefined;
  
  constructor(
    private schemaResolutionService: SchemaResolutionService
  ) {}

  ngOnInit(): void {
    // Perform the asynchronous schema resolution
    this.resolveSchema();
  }

  resolveSchema() {
    this.schemaResolutionService
      .resolveSchema(this.schema, this.resolverOptions)
      .pipe(
        catchError((error) => {
          this.error = error;
          return throwError(error);
        })
      )
      .subscribe((result) => {
        this.resolvedSchema = result;
      });
  }

  get getSchemaTitle() : string {
    if (typeof this.resolvedSchema !== "boolean" && this.resolvedSchema.title !== undefined) {
      return this.resolvedSchema.title;
    }
    return "Schema";
  }
}
