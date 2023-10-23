import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

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

type renderTemplates = "booleanSchema" | "schemaTitle" | "schemaTypes" | "schemaFallback";

@Component({
  selector: 'jsv-friendly-name',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    OrLabelComponent,
    TypeLabelSwitchComponent,
    forwardRef( () => GenerateFriendlyNameFallbackComponent),
    forwardRef( () => GenerateFriendlyNameCustomComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Final rendered friendly name -->
    <ng-container [ngSwitch]="selectTemplate">

      <ng-container *ngSwitchCase="'booleanSchema'">
        <ng-container *ngTemplateOutlet="booleanSchema"></ng-container>
      </ng-container>

      <ng-container *ngSwitchCase="'schemaTitle'">
        <ng-container *ngTemplateOutlet="schemaTitle"></ng-container>
      </ng-container>

      <ng-container *ngSwitchCase="'schemaTypes'">
        <ng-container *ngTemplateOutlet="schemaTypes"></ng-container>
      </ng-container>

      <ng-container *ngSwitchDefault>
        <ng-container *ngTemplateOutlet="schemaFallback"></ng-container>
      </ng-container>

    </ng-container>

    <!-- Templates -->

    <!--  In case the schema is always valid or not -->
    <ng-template #booleanSchema>
      <jsv-type-label-switch [type]="typedBoolean" />
    </ng-template>

    <!-- Some people maintaining schemas provide a friendly name by themself -->
    <ng-template #schemaTitle>
      {{ typedSchema.title! }}
    </ng-template>

    <!-- Default strategy, when types are known -->
    <ng-template #schemaTypes>
      <ng-container *ngFor="let type of foundTypes; let isLast = last">
        <jsv-friendly-name-custom [schema]="typedSchema" [type]="type"/>
        <ng-container *ngIf="!isLast">
          <labels-or />
        </ng-container>
      </ng-container>
    </ng-template>

    <!-- Fallback, when none of the previous rules matched -->
    <ng-template #schemaFallback>
      <jsv-friendly-name-fallback [schema]="typedSchema" />
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

  // To know which template to render
  get selectTemplate(): renderTemplates {
    if (this.isBoolean) {
      return "booleanSchema";
    } else {
      let castSchema = this.typedSchema;
      
      if (castSchema.title !== undefined) {
        return "schemaTitle";
      }

      if (this.foundTypes.length !== 0) {
        return "schemaTypes";
      }

      return "schemaFallback";
    }
  }

}

