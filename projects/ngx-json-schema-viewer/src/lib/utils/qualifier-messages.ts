import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSVOptionsService } from '../services/jsv-options';

// qualifier messages
import { ConstantComponent } from "./QualifierMessages/constant";
import { DefaultValueComponent } from "./QualifierMessages/default-value";
import { EnumComponent } from "./QualifierMessages/enum";
import { ExamplesComponent } from "./QualifierMessages/examples";
import { ReadOnlyComponent } from "./QualifierMessages/readOnly";
import { WriteOnlyComponent } from "./QualifierMessages/writeOnly";
import { ArrayUniqueItemsComponent } from "./QualifierMessages/array-unique-items";
import { DeprecatedComponent } from "./QualifierMessages/deprecated";
import { NullableComponent } from "./QualifierMessages/nullable";
import { StringLengthComponent } from "./QualifierMessages/string-length";
import { ObjectPropertiesComponent } from "./QualifierMessages/object-properties";
import { NoExtraPropertiesComponent } from "./QualifierMessages/no-extra-properties";
import { ArrayNumberOfItemsComponent } from "./QualifierMessages/array-number-of-items";
import { ArrayContainsNumberComponent } from "./QualifierMessages/array-contains-number";
import { NoExtraItemsComponent } from "./QualifierMessages/no-extra-items";
import { NumberBoundsComponent } from "./QualifierMessages/number-bounds";
import { PatternComponent } from "./QualifierMessages/pattern";
import { MultipleOfComponent } from "./QualifierMessages/number-multiple-of";
import { ContentEncodingComponent } from "./QualifierMessages/content-encoding";
import { ContentMediaTypeComponent } from "./QualifierMessages/content-media";
import { ContentSchemaComponent } from "./QualifierMessages/content-schema";

// Types
import type { JSONSchema, JSONSchemaNS } from '../types';
import type { JSVOptions, CheckKey } from '../services/jsv-options';

@Component({
    selector: 'qm-messages',
    standalone: true,
    imports: [
        CommonModule,
        ConstantComponent,
        DefaultValueComponent,
        EnumComponent,
        ExamplesComponent,
        ReadOnlyComponent,
        WriteOnlyComponent,
        ArrayUniqueItemsComponent,
        DeprecatedComponent,
        NullableComponent,
        StringLengthComponent,
        ObjectPropertiesComponent,
        NoExtraPropertiesComponent,
        ArrayNumberOfItemsComponent,
        ArrayContainsNumberComponent,
        NoExtraItemsComponent,
        NumberBoundsComponent,
        PatternComponent,
        MultipleOfComponent,
        ContentEncodingComponent,
        ContentMediaTypeComponent,
        ContentSchemaComponent
    ],
    template: `
        <div>
            <ng-container *ngFor="let key of filteredQualifiers">
                <ng-container [ngSwitch]="key">
                    <qm-constant *ngSwitchCase="'const'" [schema]="schema"/>
                    <qm-default-value *ngSwitchCase="'default'" [schema]="schema"/>
                    <qm-enum *ngSwitchCase="'enum'" [schema]="schema"/>
                    <qm-examples *ngSwitchCase="'examples'" [schema]="schema"/>
                    <qm-read-only *ngSwitchCase="'readOnly'" />
                    <qm-write-only *ngSwitchCase="'writeOnly'" />
                    <qm-array-unique-items *ngSwitchCase="'uniqueItems'" />
                    <qm-deprecated *ngSwitchCase="'deprecated'" />
                    <qm-nullable *ngSwitchCase="'nullable'" />
                    <qm-string-length *ngSwitchCase="'stringLength'" [schema]="schema" />
                    <qm-object-properties *ngSwitchCase="'objectProperties'" [schema]="schema" />
                    <qm-no-extra-properties *ngSwitchCase="'no-extra-properties'" />
                    <qm-array-number-of-items *ngSwitchCase="'arrayItems'" [schema]="schema" />
                    <qm-array-contains *ngSwitchCase="'arrayContains'" [schema]="schema" />
                    <qm-no-extra-items *ngSwitchCase="'no-extra-items'" />
                    <qm-number-bounds *ngSwitchCase="'number-range'" [schema]="schema" />
                    <qm-pattern *ngSwitchCase="'pattern'" [schema]="schema" />
                    <qm-multiple-of *ngSwitchCase="'multipleOf'" [schema]="schema" />
                    <qm-content-encoding *ngSwitchCase="'contentEncoding'" [schema]="schema" />
                    <qm-content-media-type *ngSwitchCase="'contentMediaType'" [schema]="schema" />
                    <qm-content-schema *ngSwitchCase="'contentSchema'" [schema]="typedAsJSONSchemaString" />
                </ng-container>
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

    get typedAsJSONSchemaString(): JSONSchemaNS.String {
        return this.schema as JSONSchemaNS.String;
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