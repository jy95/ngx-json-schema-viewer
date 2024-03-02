import { Component, OnInit, Input, signal, computed, ChangeDetectionStrategy } from '@angular/core';

// imports

import { MatExpansionModule } from '@angular/material/expansion';

import {
  CreateNodesComponent
} from "./common/index"

// services
import { SchemaResolutionService } from './services/schema-resolver';

// Labels
import {
  ErrorOccurredLabelComponent,
  LoadingLabelComponent
} from "./labels/index";

// Types
import type { JSONSchema } from './types';
import type { IResolveOpts } from "@stoplight/json-ref-resolver/types"
type StatusType = "LOADING" | "ERROR" | "DONE";

@Component({
  selector: 'ngx-json-schema-viewer',
  standalone: true,
  imports: [
    MatExpansionModule,
    CreateNodesComponent,
    ErrorOccurredLabelComponent,
    LoadingLabelComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Error ... -->
    @if (status() === 'ERROR') {
      <div>
        <labels-error-occurred [error]="error()!"/>
      </div>
    }
    
    <!-- Loading ... -->
    @if (status() === 'LOADING') {
      <labels-loading />
    }
    
    <!-- Schema -->
    @if (status() === 'DONE') {
      <mat-accordion>
        <mat-expansion-panel [(expanded)]="expanded">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <strong>
                {{ getSchemaTitle }}
              </strong>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <ng-template matExpansionPanelContent>
            <jse-common-create-nodes [schema]="resolvedSchema()!" />
          </ng-template>
        </mat-expansion-panel>
      </mat-accordion>
    }
    `
})
export class NgxJsonSchemaViewerComponent implements OnInit {
  @Input({ required: true }) schema: unknown;
  @Input() resolverOptions?: IResolveOpts;

  expanded : boolean = true;
  resolvedSchema = signal<JSONSchema | undefined>(undefined);
  error = signal<Error | undefined>(undefined);

  status = computed<StatusType>(() => {
    if (this.error() !== undefined) {
      return "ERROR";
    } else if (this.resolvedSchema() === undefined) {
      return "LOADING";
    } else {
      return "DONE";
    }
  });
  
  constructor(
    private schemaResolutionService: SchemaResolutionService,
  ) {}

  ngOnInit(): void {
    // Perform the asynchronous schema resolution
    this.schemaResolution();
  }

  private schemaResolution() {
    this.schemaResolutionService
      .resolveSchema(this.schema, this.resolverOptions)
      .subscribe({
        error: (err) => {
          this.error.set(err);
          this.resolvedSchema.set(undefined);
        },
        next: (result) => {
          this.resolvedSchema.set(result);
          this.error.set(undefined);
        }
      });
  }

  get getSchemaTitle() : string {
    let schema = this.resolvedSchema()!;
    if (typeof schema !== "boolean" && schema.title !== undefined) {
      return schema.title;
    }
    return "Schema";
  }
}
