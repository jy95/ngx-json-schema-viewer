import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import {
    StringLabelComponent,
    NumberLabelComponent,
    BooleanLabelComponent,
    ObjectLabelComponent,
    ArrayLabelComponent,
    IntegerLabelComponent,
    NullLabelComponent,
    TrueLabelComponent,
    FalseLabelComponent
} from "../labels/index";

import type { TypeValues } from "../types"

@Component({
  selector: 'jsv-type-label-switch',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    StringLabelComponent,
    NumberLabelComponent,
    BooleanLabelComponent,
    ObjectLabelComponent,
    ArrayLabelComponent,
    IntegerLabelComponent,
    NullLabelComponent,
    TrueLabelComponent,
    FalseLabelComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngSwitch]="type">
      <ng-container *ngSwitchCase="'string'">
        <labels-string />
      </ng-container>
      <ng-container *ngSwitchCase="'number'">
        <labels-number />
      </ng-container>
      <ng-container *ngSwitchCase="'boolean'">
        <labels-boolean />
      </ng-container>
      <ng-container *ngSwitchCase="'object'">
        <labels-object />
      </ng-container>
      <ng-container *ngSwitchCase="'array'">
        <labels-array />
      </ng-container>
      <ng-container *ngSwitchCase="'integer'">
        <labels-integer />
      </ng-container>
      <ng-container *ngSwitchCase="'null'">
        <labels-null />
      </ng-container>
      <ng-container *ngSwitchCase="true">
        <labels-true />
      </ng-container>
      <ng-container *ngSwitchCase="false">
        <labels-false />
      </ng-container>
      <ng-container *ngSwitchDefault>
        <span style="opacity: 0.6">{{ type }}</span>
      </ng-container>
    </ng-container>
  `,
})
export class TypeLabelSwitchComponent {
  @Input({ required: true }) type!: TypeValues | true | false | string;
}
