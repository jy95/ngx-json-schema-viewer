import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { JSONSchema, TypeValues } from "../../types";

@Component({
    selector: 'jsv-friendly-name-custom',
    standalone: true,
    imports: [
      CommonModule
    ],
    template: `
    `
})
export class GenerateFriendlyNameCustomComponent {
    @Input() schema!: Exclude<JSONSchema, true | false>;
    @Input() type!: TypeValues | string;

    shouldAddSeparator(idx: number, length: number): boolean {
        return length <= 1 ? false : idx !== length - 1;
    }
}