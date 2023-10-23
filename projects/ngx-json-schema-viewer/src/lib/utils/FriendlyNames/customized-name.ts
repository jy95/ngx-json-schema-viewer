import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

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
      NgSwitch,
      NgSwitchCase,
      NgSwitchDefault,
      TypeLabelSwitchComponent,
      forwardRef(() => GenerateFriendlyNameCustomArrayComponent)
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container [ngSwitch]="type">
            
            <ng-container *ngSwitchCase="'string'">
                <jsv-type-label-switch [type]="stringOrFormat" />
            </ng-container>
            
            <ng-container *ngSwitchCase="'array'">
                <jsv-friendly-name-custom-array [schema]="asTypedArray" />
            </ng-container>
            
            <ng-container *ngSwitchDefault>
                <jsv-type-label-switch [type]="type" />
            </ng-container>

        </ng-container>
    `
})
export class GenerateFriendlyNameCustomComponent {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
    @Input() type!: TypeValues | string;

    get asTypedArray() {
        return this.schema as JSONSchemaNS.Array;
    }

    get stringOrFormat() {
        return this.schema.format ? this.schema.format : "string";
    }
}