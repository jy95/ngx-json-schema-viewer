import { Component, OnInit, Input, signal, computed, ChangeDetectionStrategy } from '@angular/core';

// imports
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  CreateNodesComponent
} from "./common/index"

// services
import { SchemaResolutionService } from './services/schema-resolver';
import { JSVOptionsService } from "./services/jsv-options";

// Labels
import {
  ErrorOccurredLabelComponent,
  LoadingLabelComponent
} from "./labels/index";

// Types
import type { JSONSchema } from './types';
import type { IResolveOpts } from "@stoplight/json-ref-resolver/types"
import type { JSVOptions } from "./services/jsv-options";
type StatusType = "LOADING" | "ERROR" | "DONE";

@Component({
  selector: 'ngx-json-schema-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    CreateNodesComponent,
    ErrorOccurredLabelComponent,
    LoadingLabelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    JSVOptionsService
  ],
  template: `
    <!-- Error ... -->
    <ng-container *ngIf="status() === 'ERROR'">
      <div>
        <labels-error-occurred [error]="error()!"/>
      </div>
    </ng-container>

    <!-- Loading ... -->
    <div *ngIf="status() === 'LOADING'">
        <labels-loading />
    </div>

    <!-- Schema -->
    <div *ngIf="status() === 'DONE'">
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
    </div>
  `
})
export class NgxJsonSchemaViewerComponent implements OnInit {
  @Input({ required: true }) schema: unknown;
  @Input() resolverOptions?: IResolveOpts;
  @Input() viewerOptions?: Partial<JSVOptions>;

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
    private jsvOptionsService: JSVOptionsService,
  ) {}

  ngOnInit(): void {
    // If asked, apply user options
    if (this.viewerOptions) {
      this.jsvOptionsService.setOptions(this.viewerOptions);
    }
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
