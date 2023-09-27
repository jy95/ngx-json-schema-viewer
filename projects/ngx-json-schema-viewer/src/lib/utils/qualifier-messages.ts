import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSVOptionsService } from '../services/jsv-options';

import type { JSONSchema, JSONSchemaNS } from '../types';
import type { JSVOptions, CheckKey } from '../services/jsv-options';


@Component({
    selector: 'qm-messages',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <ng-container *ngFor="let key of filteredQualifiers">
                
            </ng-container>
        </div>
    `
})
export class QualifierMessages {
    @Input() schema!: Exclude<JSONSchema, true | false>;

    constructor(private jsvOptionsService: JSVOptionsService) {}

    get options(): JSVOptions {
        return this.jsvOptionsService.getOptions();
    }

    get filteredQualifiers(): CheckKey[] {
        const qualifierMessagesOrder = this.options.qualifierMessagesOrder || this.jsvOptionsService.getDefaultQualifierMessageOrder();

        return qualifierMessagesOrder.filter(qualifierKey => {
            switch(qualifierKey) {
                case 'const':
                    return this.schema.const !== undefined;
                case 'default':
                    return this.schema.default !== undefined;
                case 'enum':
                    return this.schema.enum !== undefined;
                case 'examples':
                    return (this.options.showExamples || false) && this.schema.examples !== undefined;
                case 'readOnly':
                    return this.schema.readOnly === true;
                case 'writeOnly':
                    return this.schema.writeOnly === true;
                case 'uniqueItems':
                    return this.schema.uniqueItems === true;
                case 'deprecated':
                    return (this.schema as JSONSchemaNS.Object).deprecated === true;
                case 'nullable':
                    return (this.schema as any).nullable === true;
                case 'stringLength':
                    return this.schema.minLength !== undefined || this.schema.maxLength !== undefined;
                case 'objectProperties':
                    return this.schema.minProperties !== undefined || this.schema.maxProperties !== undefined;
                case 'no-extra-properties':
                    return this.schema.additionalProperties === false || (this.schema as JSONSchemaNS.Object).unevaluatedProperties === false;
                case 'arrayItems':
                    return this.schema.minItems !== undefined || this.schema.maxItems !== undefined;
                case 'arrayContains':
                    return (this.schema as JSONSchemaNS.Array).minContains !== undefined || (this.schema as JSONSchemaNS.Array).maxContains !== undefined;
                case 'no-extra-items':
                    return (this.schema as JSONSchemaNS.Array).unevaluatedItems === false || this.schema.items === false || this.schema.additionalItems === false;
                case 'number-range':
                    return this.schema.minimum !== undefined || this.schema.exclusiveMinimum !== undefined || this.schema.maximum !== undefined || this.schema.exclusiveMaximum !== undefined;
                case 'pattern':
                    return this.schema.pattern !== undefined;
                case 'multipleOf':
                    return this.schema.multipleOf !== undefined;
                case 'contentMediaType':
                    return this.schema.contentMediaType !== undefined;
                case 'contentEncoding':
                    return this.schema.contentEncoding !== undefined;
                case 'contentSchema':
                    return (this.schema as JSONSchemaNS.String).contentSchema !== undefined;
            }
        });
    }
}