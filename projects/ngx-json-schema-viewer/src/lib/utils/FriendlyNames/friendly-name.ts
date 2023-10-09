import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    OrLabelComponent,
} from "../../labels/index"

import {
    detectedTypes
} from "../detectTypes";

import {
  TypeLabelSwitchComponent
} from "../type-label-switch";

import {
    GenerateFriendlyNameFallbackComponent,
    GenerateFriendlyNameCustomComponent
} from "./index";

import type { JSONSchema, TypeValues } from "../../types";

@Component({
  selector: 'jsv-friendly-name',
  standalone: true,
  imports: [
    CommonModule,
    OrLabelComponent,
    TypeLabelSwitchComponent,
    forwardRef( () => GenerateFriendlyNameFallbackComponent),
    forwardRef( () => GenerateFriendlyNameCustomComponent)
  ],
  template: `
    <!--  In case the schema is always valid or not -->
    <ng-container *ngIf="isBoolean" else titleOrCustomBlock>
      <jsv-type-label-switch [type]="typedBoolean" />
    </ng-container>

    <ng-template #titleOrCustomBlock>

      <!-- Some people maintaining schemas provide a friendly name by themself -->
      <ng-container *ngIf="typedSchema.title; else customTypeBlock">
        {{ typedSchema.title }}
      </ng-container>

      <!-- Default strategy -->
      <ng-template #customTypeBlock>

        <ng-container *ngIf="foundTypes.length === 0; else customTypeLoopBlock">
          <jsv-friendly-name-fallback [schema]="typedSchema" />
        </ng-container>

        <ng-template #customTypeLoopBlock>
          <ng-container *ngFor="let type of foundTypes; let isLast = last">
            <jsv-friendly-name-custom [schema]="typedSchema" [type]="type"/>
            <ng-container *ngIf="!isLast">
              <labels-or />
            </ng-container>
          </ng-container>
        </ng-template>

    </ng-template>
  `,
})
export class GenerateFriendlyNameComponent {
  @Input({ required: true }) schema!: JSONSchema;

  get foundTypes(): TypeValues[] {
    return (typeof this.schema !== "boolean") ? detectedTypes(this.schema) : [];
  }

  get isBoolean(): boolean {
    return typeof this.schema === 'boolean';
  }

  get typedBoolean(): boolean {
    return this.schema as boolean;
  }

  get typedSchema(): Exclude<JSONSchema, true | false> {
    return this.schema as Exclude<JSONSchema, true | false>;
  }

}

