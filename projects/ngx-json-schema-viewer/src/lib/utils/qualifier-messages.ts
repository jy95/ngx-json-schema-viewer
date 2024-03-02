import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { JSVOptionsService } from '../services/jsv-options';

// qualifier messages
import {
    ConstantComponent,
    ArrayContainsNumberComponent,
    ArrayNumberOfItemsComponent,
    ArrayUniqueItemsComponent,
    ContentEncodingComponent,
    ContentMediaTypeComponent,
    ContentSchemaComponent,
    DefaultValueComponent,
    DeprecatedComponent,
    EnumComponent,
    ExamplesComponent,
    MultipleOfComponent,
    NoExtraItemsComponent,
    NoExtraPropertiesComponent,
    NullableComponent,
    NumberBoundsComponent,
    ObjectPropertiesComponent,
    PatternComponent,
    ReadOnlyComponent,
    StringLengthComponent,
    WriteOnlyComponent
} from "./QualifierMessages/index";

// Types
import type { JSONSchema, JSONSchemaNS } from '../types';
import type { JSVOptions, CheckKey } from '../services/jsv-options';

@Component({
    selector: 'qm-messages',
    standalone: true,
    imports: [
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>
          @for (key of filteredQualifiers; track key) {
            @switch (key) {
              @case ('const') {
                <qm-constant [schema]="schema"/>
              }
              @case ('default') {
                <qm-default-value [schema]="schema"/>
              }
              @case ('enum') {
                <qm-enum [schema]="schema"/>
              }
              @case ('examples') {
                <qm-examples [schema]="schema"/>
              }
              @case ('readOnly') {
                <qm-read-only />
              }
              @case ('writeOnly') {
                <qm-write-only />
              }
              @case ('uniqueItems') {
                <qm-array-unique-items />
              }
              @case ('deprecated') {
                <qm-deprecated />
              }
              @case ('nullable') {
                <qm-nullable />
              }
              @case ('stringLength') {
                <qm-string-length [schema]="schema" />
              }
              @case ('objectProperties') {
                <qm-object-properties [schema]="schema" />
              }
              @case ('no-extra-properties') {
                <qm-no-extra-properties />
              }
              @case ('arrayItems') {
                <qm-array-number-of-items [schema]="schema" />
              }
              @case ('arrayContains') {
                <qm-array-contains [schema]="schema" />
              }
              @case ('no-extra-items') {
                <qm-no-extra-items />
              }
              @case ('number-range') {
                <qm-number-bounds [schema]="schema" />
              }
              @case ('pattern') {
                <qm-pattern [schema]="schema" />
              }
              @case ('multipleOf') {
                <qm-multiple-of [schema]="schema" />
              }
              @case ('contentEncoding') {
                <qm-content-encoding [schema]="schema" />
              }
              @case ('contentMediaType') {
                <qm-content-media-type [schema]="schema" />
              }
              @case ('contentSchema') {
                <qm-content-schema [schema]="typedAsJSONSchemaString" />
              }
            }
          }
        </div>
        `
})
export class QualifierMessages {
    @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

    constructor(private jsvOptionsService: JSVOptionsService) {}

    get options(): JSVOptions {
        return this.jsvOptionsService.getOptions();
    }

    get typedAsJSONSchemaString(): JSONSchemaNS.String {
        return this.schema as JSONSchemaNS.String;
    }

    get filteredQualifiers(): CheckKey[] {
        const qualifierMessagesOrder = this.options.qualifierMessagesOrder;

        const filteredMessagesOrder = qualifierMessagesOrder.filter(qualifierKey => {
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
        // To debug easily in the future ;)
        return filteredMessagesOrder;
    }
}