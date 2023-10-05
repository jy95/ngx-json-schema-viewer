import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import {
    GenerateFriendlyNameComponent
} from "../utils/index";

import {
    RequiredLabelComponent,
    ReadOnlyLabelComponent,
    WriteOnlyLabelComponent,
    DeprecatedLabelComponent
} from "../labels/index";

import {
    CreateNodesComponent
} from "./index";

import type { JSONSchema, JSONSchema_Draft_2019_09 } from '../types';

@Component({
  selector: 'jse-common-create-edge',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    GenerateFriendlyNameComponent,
    RequiredLabelComponent,
    ReadOnlyLabelComponent,
    WriteOnlyLabelComponent,
    DeprecatedLabelComponent,
    forwardRef(() => CreateNodesComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="schemaItem">
        <mat-accordion>
            <mat-expansion-panel>
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        <ng-content select="[name]" />
                        &nbsp;
                        <jsv-friendly-name [schema]="schema" />
                    </mat-panel-title>
                    <mat-panel-description>
                        <labels-required *ngIf="isRequired" />
                        <ng-container *ngIf="isRequired" >
                            &nbsp;
                        </ng-container>
                        <labels-deprecated *ngIf="isDeprecated" />
                        <ng-container *ngIf="isDeprecated" >
                            &nbsp;
                        </ng-container>
                        <labels-read-only *ngIf="isReadOnly" />
                        <ng-container *ngIf="isReadOnly" >
                            &nbsp;
                        </ng-container>
                        <labels-write-only *ngIf="isWriteOnly" />
                    </mat-panel-description>
                </mat-expansion-panel-header>
                <ng-template matExpansionPanelContent>
                  <jse-common-create-nodes [schema]="schema" />
                </ng-template>
            </mat-expansion-panel>
        </mat-accordion>
    </li>
  `,
  styleUrls: ['./create-edge.component.css']
})
export class CreateEdgeComponent implements OnInit {
  @Input({ required: true }) schema!: JSONSchema;
  @Input({ required: true }) required!: boolean;

  // Props
  isDeprecated : boolean = false;
  isReadOnly : boolean = false;
  isWriteOnly : boolean = false;
  isRequired : boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      const typedSchema = this.schema as JSONSchema_Draft_2019_09;
      this.isDeprecated = typeof typedSchema !== "boolean" && typedSchema.deprecated === true;
      this.isReadOnly = typeof this.schema !== "boolean" && this.schema.readOnly === true;
      this.isWriteOnly = typeof this.schema !== "boolean" && this.schema.writeOnly === true;
      this.isRequired = !this.isDeprecated && this.required;

      this.cdRef.markForCheck();
  }
}
