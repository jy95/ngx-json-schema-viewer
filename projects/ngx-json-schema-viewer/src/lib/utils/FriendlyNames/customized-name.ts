import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';


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
    TypeLabelSwitchComponent,
    forwardRef(() => GenerateFriendlyNameCustomArrayComponent)
],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
@switch (type) {
  @case ('string') {
    <jsv-type-label-switch [type]="stringOrFormat" />
  }
  @case ('array') {
    <jsv-friendly-name-custom-array [schema]="asTypedArray" />
  }
  @default {
    <jsv-type-label-switch [type]="type" />
  }
}
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