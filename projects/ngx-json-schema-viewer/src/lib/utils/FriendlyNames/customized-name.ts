import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    TypeLabelSwitchComponent,
} from "../index"

import {
    GenerateFriendlyNameCustomArrayComponent
} from "./index";

import type { JSONSchema, JSONSchemaNS, TypeValues } from "../../types";

@Component({
    selector: 'jsv-friendly-name-custom',
    standalone: true,
    imports: [
      CommonModule,
      TypeLabelSwitchComponent,
      GenerateFriendlyNameCustomArrayComponent
    ],
    template: `
        <ng-container *ngIf="type === 'string' && schema.format !== undefined">
            <jsv-type-label-switch [type]="schema.format" />
        </ng-container>
        <ng-container *ngIf="type === 'array'">
            <jsv-friendly-name-custom-array [schema]="asTypedArray" />
        </ng-container>
        <ng-container *ngIf="type !== 'string' && type !== 'array'">
            <jsv-type-label-switch [type]="type" />
        </ng-container>
    `
})
export class GenerateFriendlyNameCustomComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
    @Input() type!: TypeValues | string;

    get asTypedArray() {
        return this.schema as JSONSchemaNS.Array;
    }
}