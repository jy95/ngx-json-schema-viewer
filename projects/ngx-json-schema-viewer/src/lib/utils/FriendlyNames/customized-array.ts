import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';


import {
    TypeLabelSwitchComponent,
    GenerateFriendlyNameComponent
} from "../index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
    selector: 'jsv-friendly-name-custom-array',
    standalone: true,
    imports: [
    TypeLabelSwitchComponent,
    forwardRef(() => GenerateFriendlyNameComponent)
],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- KISS return the generic type when specs are messy -->
        @if (noClearSpecs) {
          <jsv-type-label-switch [type]="'array'" />
        } @else {
          <!-- 1) "prefixItems" -->
          @if (isPrefixItemsArray) {
            @for (subSchema of typedPrefixItemsArray; track subSchema; let isLast = $last) {
              <jsv-friendly-name [schema]="subSchema" />
              {{ !isLast ? ',' : '' }}
            }
          }
          <!-- Separator -->
          @if (firstSeparator) {
            {{ ',' }}
          }
          <!-- 2A) "items" -->
          @if (hasItems) {
            @for (subSchema of itemsAsArray; track subSchema; let isLast = $last) {
              <jsv-friendly-name [schema]="subSchema" />
              {{ !isLast ? ',' : '' }}
            }
          }
          <!-- Separator -->
          @if (secondSeparator) {
            {{ ',' }}
          }
          <!-- 2B) "additionalItems" (to cover cases for specs below the draft-2020-12 version) -->
          @if (hasAdditionalItems) {
            <jsv-friendly-name [schema]="schema.additionalItems!" />
          }
          <!-- Separator -->
          @if (thirdSeparator) {
            {{ ',' }}
          }
          <!-- 2C) "unevaluatedItems" (to cover cases specs >= draft-2020-12 version) -->
          @if (hasUnevaluatedItems) {
            <jsv-friendly-name [schema]="schema.unevaluatedItems!" />
          }
          <!-- Separator -->
          @if (fourSeparator) {
            {{ ',' }}
          }
          <!-- 3) "contains" -->
          @if (hasContains) {
            {{ '...' }}
            {{ ',' }}
            <jsv-friendly-name [schema]="schema.contains!" />
          }
          <!-- Separator -->
          @if (fithSeparator) {
            {{ ',' }}
          }
          <!-- 4) Is it a open tuple ? -->
          @if (isOpenTuple) {
            {{ '...' }}
          }
        }
        
        `
})
export class GenerateFriendlyNameCustomArrayComponent {
    @Input({ required: true }) schema!: JSONSchemaNS.Array;

    // For separators
    get firstSeparator() : boolean {
        return this.isPrefixItemsArray && this.hasItems;
    }

    get secondSeparator() : boolean {
        return this.hasItems && this.hasAdditionalItems;
    }

    get thirdSeparator() : boolean {
        return this.hasAdditionalItems && this.hasUnevaluatedItems;
    }

    get fourSeparator() : boolean {
        return this.hasUnevaluatedItems && this.hasContains;
    }

    get fithSeparator() : boolean {
        return this.hasContains && this.isOpenTuple;
    }

    // No clear specifications about the contents of the array ?
    get noClearSpecs(): boolean {
        return [undefined, false].includes(this.schema.items as any) &&
            [undefined, false].includes(this.schema.prefixItems as any) &&
            this.schema.contains === undefined;
    }

    get isPrefixItemsArray(): boolean {
        return Array.isArray(this.schema.prefixItems);
    }

    get typedPrefixItemsArray() {
        return this.schema.prefixItems as JSONSchema[];
    }

    get hasItems() : boolean {
        return this.schema.items !== undefined && typeof this.schema.items !== "boolean";
    }

    get itemsAsArray() : JSONSchema[] {
        return (Array.isArray(this.schema.items) ? this.schema.items : [this.schema.items]) as JSONSchema[];
    }

    get hasAdditionalItems(): boolean {
        return this.schema.additionalItems !== undefined && typeof this.schema.additionalItems !== "boolean";
    }

    get hasUnevaluatedItems(): boolean {
        return this.schema.unevaluatedItems !== undefined && typeof this.schema.unevaluatedItems !== "boolean";
    }

    get hasContains(): boolean {
        return this.schema.contains !== undefined;
    }

    get isOpenTuple(): boolean {
        return !(
            (this.schema as JSONSchemaNS.Array).unevaluatedItems === false ||
            this.schema.items === false ||
            this.schema.additionalItems === false
        );
    }
}