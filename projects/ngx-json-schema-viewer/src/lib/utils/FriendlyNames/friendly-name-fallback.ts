import { Component, Input } from '@angular/core';
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
      GenerateFriendlyNameComponent,
      TypeLabelSwitchComponent
    ],
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
        <ng-template *ngIf="hasOfKeyword; else defaultStrategy">
            <ng-container *ngFor="let elem of elementsOf; let idx = index">
                <jsv-friendly-name [schema]="elem" />
                <ng-container *ngIf="shouldAddSeparator(idx, elementsOf.length)">
                    <ng-container [ngSwitch]="linkword">
                        <labels-or *ngSwitchCase="'OR'" />
                        <labels-xor *ngSwitchCase="'XOR'" />
                        <labels-and *ngSwitchCase="'AND'" />
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-template>

        <!--  2. Assume it is "any" by default -->
        <ng-template #defaultStrategy>
            <jsv-type-label-switch [type]="true"] />
        </ng-template>
    `
})
export class GenerateFriendlyNameFallbackComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>

    // has a "...Of" keyword ?
    hasOfKeyword : boolean = this.schema.allOf !== undefined || this.schema.anyOf !== undefined || this.schema.oneOf !== undefined;

    // has a "not" keyword ?
    hasNotKeyword : boolean = this.schema.not !== undefined;

    // Kind of operators to use ?
    linkword : LinkType = this.schema.anyOf ? "OR" : this.schema.oneOf ? "XOR" : "AND";

    shouldAddSeparator(idx: number, length: number): boolean {
        return length <= 1 ? false : idx !== length - 1;
    }

    // allOf / anyOf / oneOf
    get elementsOf() : JSONSchema[] {
        return (this.schema.allOf || this.schema.anyOf || this.schema.oneOf || []) as JSONSchema[];
    }
}