import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { CreateNodesComponent } from "../../common/create-nodes";

import { IfLabelComponent, ThenLabelComponent, ElseLabelComponent } from "../../labels/index";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-if-else-then',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule,
    IfLabelComponent,
    ThenLabelComponent,
    ElseLabelComponent,
    CreateNodesComponent
  ],
  template: `
    <mat-tab-group>
      <mat-tab *ngFor="let val of values">
        <ng-template mat-tab-label>
          <ng-container *ngIf="val.key === 'if'; else elseTemplate">
            <labels-if />
          </ng-container>
          <ng-template #elseTemplate>
            <ng-container *ngIf="val.key === 'then'; else otherElseTemplate">
              <labels-then />
            </ng-container>
            <ng-template #otherElseTemplate>
              <labels-else />
            </ng-template>
          </ng-template>
        </ng-template>
        <ng-template matTabContent>
            <jse-common-create-nodes [schema]="val.schema" />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class IfElseThenComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get hasThen(): boolean {
    return this.schema.then !== undefined;
  }

  get hasElse(): boolean {
    return this.schema.else !== undefined;
  }

  get values(): { key: string, schema: JSONSchema }[] {
    const values = [
      {
        key: "if",
        schema: this.schema.if!,
      },
      this.hasThen && {
        key: "then",
        schema: this.schema.then!,
      },
      this.hasElse && {
        key: "else",
        schema: this.schema.else!,
      },
    ].filter((v) => !!v) as { key: string, schema: JSONSchema }[];

    return values;
  }
}
