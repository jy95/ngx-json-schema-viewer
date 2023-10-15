import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import {
    RenderProvidedTypeComponent
} from "./index";

import {
    TypeLabelSwitchComponent
} from "../utils/index";

import type {
    TypeValues,
    JSONSchema
} from "../types";

@Component({
  selector: 'jse-common-multiple-types',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    RenderProvidedTypeComponent,
    TypeLabelSwitchComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-tab-group>
      <ng-container *ngFor="let type of types">
        <mat-tab>
          <ng-template mat-tab-label>
              <jsv-type-label-switch [type]="type" />
          </ng-template>
          <jse-common-render-provided-type [type]="type" [schema]="schema" [nullable]="nullable" /> 
        </mat-tab>
      </ng-container>
    </mat-tab-group>
  `
})
export class RenderMultipleTypesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
  @Input() nullable?: boolean;
  @Input({ required: true }) types!: TypeValues[];
}