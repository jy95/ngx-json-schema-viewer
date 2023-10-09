import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    TypeLabelSwitchComponent,
    GenerateFriendlyNameComponent
} from "../index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
    selector: 'jsv-friendly-name-custom-array',
    standalone: true,
    imports: [
      CommonModule,
      TypeLabelSwitchComponent,
      forwardRef(() => GenerateFriendlyNameComponent)
    ],
    template: `
        <!-- KISS return the generic type when specs are messy -->
        <ng-template *ngIf="noClearSpecs; else clearSpecs">
            <jsv-type-label-switch [type]="'array'" />
        </ng-template>

        <ng-template #clearSpecs>

            <!-- 1) "prefixItems" -->
            <ng-container *ngIf="isPrefixItemsArray">
                <ng-container *ngFor="let subSchema of typedPrefixItemsArray; let isLast = last">
                    <jsv-friendly-name [schema]="subSchema" />
                    {{ !isLast ? ',' : '' }}
                </ng-container>
            </ng-container>

            <!-- Separator -->
            <ng-container *ngIf="firstSeparator">
                {{ ',' }}
            </ng-container>

            <!-- 2A) "items" -->
            <ng-container *ngIf="hasItems">
                <ng-container *ngFor="let subSchema of itemsAsArray; let isLast = last">
                    <jsv-friendly-name [schema]="subSchema" />
                    {{ !isLast ? ',' : '' }}
                </ng-container>
            </ng-container>

            <!-- Separator -->
            <ng-container *ngIf="secondSeparator">
                {{ ',' }}
            </ng-container>

            <!-- 2B) "additionalItems" (to cover cases for specs below the draft-2020-12 version) -->
            <ng-container *ngIf="hasAdditionalItems">
                <jsv-friendly-name [schema]="schema.additionalItems!" />
            </ng-container>

            <!-- Separator -->
            <ng-container *ngIf="thirdSeparator">
                {{ ',' }}
            </ng-container>

            <!-- 2C) "unevaluatedItems" (to cover cases specs >= draft-2020-12 version) -->
            <ng-container *ngIf="hasUnevaluatedItems">
                <jsv-friendly-name [schema]="schema.unevaluatedItems!" />
            </ng-container>

            <!-- Separator -->
            <ng-container *ngIf="fourSeparator">
                {{ ',' }}
            </ng-container>

            <!-- 3) "contains" -->
            <ng-container *ngIf="hasContains">
                {{ '...' }}
                {{ ',' }}
                <jsv-friendly-name [schema]="schema.contains!" />
            </ng-container>

            <!-- Separator -->
            <ng-container *ngIf="fithSeparator">
                {{ ',' }}
            </ng-container>

            <!-- 4) Is it a open tuple ? -->
            <ng-container *ngIf="isOpenTuple">
                {{ '...' }}
            </ng-container>

        </ng-template>
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