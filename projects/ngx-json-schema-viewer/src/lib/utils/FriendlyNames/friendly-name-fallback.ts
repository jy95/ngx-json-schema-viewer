import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AndLabelComponent,
    NotLabelComponent,
    OrLabelComponent,
    XorLabelComponent
} from "../../labels/index";

import {
    GenerateFriendlyNameComponent
} from "./index";

import {
    TypeLabelSwitchComponent
} from "../index";

import type { JSONSchema } from "../../types";

type LinkType = "AND" | "OR" | "XOR";

@Component({
    selector: 'jsv-friendly-name-fallback',
    standalone: true,
    imports: [
      CommonModule,
      NotLabelComponent,
      AndLabelComponent,
      XorLabelComponent,
      OrLabelComponent,
      forwardRef(() => GenerateFriendlyNameComponent),
      TypeLabelSwitchComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!--  1. we have a Schema Composition case (not, allOf, ...) -->

        <!--  1A) the "not" case -->
        <ng-container *ngIf="hasNotKeyword">
            <labels-not />
            {{ ' (' }}
            <jsv-friendly-name [schema]="schema.not!" />
            {{ ' ) ' }}
        </ng-container>

        <!--  1B) the "allOf" / "oneOf" / "anyOf" -->
        <ng-container *ngIf="hasOfKeyword; else defaultStrategy">
            <ng-container *ngFor="let elem of elementsOf; let isLast = last">
                <jsv-friendly-name [schema]="elem" />
                <ng-container *ngIf="!isLast">
                    <ng-container [ngSwitch]="linkword">
                        <labels-or *ngSwitchCase="'OR'" />
                        <labels-xor *ngSwitchCase="'XOR'" />
                        <labels-and *ngSwitchCase="'AND'" />
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-container>

        <!--  2. Assume it is "any" by default -->
        <ng-template #defaultStrategy>
            <jsv-type-label-switch [type]="true" />
        </ng-template>
    `
})
export class GenerateFriendlyNameFallbackComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>

    // has a "...Of" keyword ?
    get hasOfKeyword(): boolean {
        return this.schema.allOf !== undefined || this.schema.anyOf !== undefined || this.schema.oneOf !== undefined;
    }

    // has a "not" keyword ?
    get hasNotKeyword(): boolean {
        return this.schema.not !== undefined;
    }

    // Kind of operators to use ?
    get linkword(): LinkType {
        return this.schema.anyOf ? "OR" : this.schema.oneOf ? "XOR" : "AND";
    }

    // allOf / anyOf / oneOf
    get elementsOf() : JSONSchema[] {
        return (this.schema.allOf || this.schema.anyOf || this.schema.oneOf || []) as JSONSchema[];
    }
}