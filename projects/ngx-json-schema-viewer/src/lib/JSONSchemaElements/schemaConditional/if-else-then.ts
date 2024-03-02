
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { CreateNodesComponent } from "../../common/create-nodes";

import { IfLabelComponent, ThenLabelComponent, ElseLabelComponent } from "../../labels/index";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-conditional-if-else-then',
  standalone: true,
  imports: [
    MatTabsModule,
    IfLabelComponent,
    ThenLabelComponent,
    ElseLabelComponent,
    forwardRef(() => CreateNodesComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-tab-group>
    
      <!-- If case -->
      @if (schema.if) {
        <mat-tab>
          <ng-template mat-tab-label>
            <labels-if />
          </ng-template>
          <ng-template matTabContent>
            <jse-common-create-nodes [schema]="schema.if" />
          </ng-template>
        </mat-tab>
      }
    
      <!-- Then case -->
      @if (schema.then) {
        <ng-template [ngTemplateOutlet]=""></ng-template>
      }
    
      <!-- Else case -->
      @if (schema.else) {
        <mat-tab>
          <ng-template mat-tab-label>
            <labels-else />
          </ng-template>
          <ng-template matTabContent>
            <jse-common-create-nodes [schema]="schema.else" />
          </ng-template>
        </mat-tab>
      } @else {
        <ng-template [ngTemplateOutlet]=""></ng-template>
      }
    
    </mat-tab-group>
    `,
})
export class IfElseThenComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
}
