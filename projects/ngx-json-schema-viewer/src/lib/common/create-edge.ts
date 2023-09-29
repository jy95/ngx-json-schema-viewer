import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
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
                <jse-common-create-nodes [schema]="schema" />
            </mat-expansion-panel>
        </mat-accordion>
    </li>
  `,
  styleUrls: ['./create-edge.component.css']
})
export class CreateEdgeComponent {
  @Input({ required: true }) schema!: JSONSchema;
  @Input({ required: true }) required!: boolean;

  get typedSchema(): JSONSchema_Draft_2019_09 {
    return this.schema as JSONSchema_Draft_2019_09;
  }

  get isDeprecated(): boolean {
    return typeof this.typedSchema !== "boolean" && this.typedSchema.deprecated === true
  }

  get isReadOnly(): boolean {
    return typeof this.schema !== "boolean" && this.schema.readOnly === true;
  }

  get isWriteOnly(): boolean {
    return typeof this.schema !== "boolean" && this.schema.writeOnly === true;
  }

  get isRequired(): boolean {
    return !this.isDeprecated && this.required;
  }
}
