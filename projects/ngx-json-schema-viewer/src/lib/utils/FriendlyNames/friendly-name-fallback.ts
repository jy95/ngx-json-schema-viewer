import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';


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
        @if (hasNotKeyword) {
          <labels-not />
          {{ ' (' }}
          <jsv-friendly-name [schema]="schema.not!" />
          {{ ' ) ' }}
        }
        
        <!--  1B) the "allOf" / "oneOf" / "anyOf" -->
        @if (hasOfKeyword) {
          @for (elem of elementsOf; track elem; let isLast = $last) {
            <jsv-friendly-name [schema]="elem" />
            @if (!isLast) {
              @switch (linkword) {
                @case ('OR') {
                  <labels-or />
                }
                @case ('XOR') {
                  <labels-xor />
                }
                @case ('AND') {
                  <labels-and />
                }
              }
            }
          }
        } @else {
          <jsv-type-label-switch [type]="true" />
        }
        
        <!--  2. Assume it is "any" by default -->
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