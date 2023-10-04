import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
  providers: [
    JSVOptionsService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Error ... -->
    <ng-container *ngIf="error !== undefined; else loadingSchema">
      <div>
        <labels-error-occurred [error]="error!"/>
      </div>
    </ng-container>

    <!-- Loading ... -->
    <ng-template #loadingSchema>
      <div *ngIf="resolvedSchema === undefined">
        <labels-loading />
      </div>
    </ng-template>

    <!-- Schema -->
    <div *ngIf="resolvedSchema !== undefined">
      <mat-accordion>
        <mat-expansion-panel [expanded]="expanded">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <strong>
                {{ getSchemaTitle }}
              </strong>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <ng-template matExpansionPanelContent>
            <jse-common-create-nodes [schema]="resolvedSchema" />
          </ng-template>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `
})
export class NgxJsonSchemaViewerComponent implements OnInit {
  @Input({ required: true }) schema: unknown;
  @Input() resolverOptions?: IResolveOpts;
  @Input() vierwerOptions?: Partial<JSVOptions>;
  resolvedSchema: JSONSchema = false;
  error: Error | undefined;

  expanded : boolean = true;
  
  constructor(
    private schemaResolutionService: SchemaResolutionService,
    private jsvOptionsService: JSVOptionsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // If asked, apply user options
    if (this.vierwerOptions) {
      this.jsvOptionsService.setOptions(this.vierwerOptions);
    }
    // Perform the asynchronous schema resolution
    this.schemaResolution();
  }

  private schemaResolution() {
    this.schemaResolutionService
      .resolveSchema(this.schema, this.resolverOptions)
      .subscribe({
        error: (err) => {
          this.error = err;
          this.resolvedSchema = false;
          this.cdr.markForCheck();
        },
        next: (result) => {
          this.resolvedSchema = result;
          this.error = undefined;
          this.cdr.markForCheck();
        }
      });
  }

  toggleExpended(): void {
    this.expanded = !this.expanded;
  }

  get getSchemaTitle() : string {
    if (typeof this.resolvedSchema !== "boolean" && this.resolvedSchema.title !== undefined) {
      return this.resolvedSchema.title;
    }
    return "Schema";
  }
}
