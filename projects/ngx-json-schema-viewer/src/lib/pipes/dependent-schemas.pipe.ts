import { Pipe, PipeTransform } from '@angular/core';

import type { JSONSchema } from "../types";

type ValueType = Record<string, JSONSchema>;
type OutputType = Exclude<JSONSchema, true | false>;

@Pipe({ 
    name: 'dependentSchemas',
    standalone: true 
})
export class DependentSchemasPipe implements PipeTransform {
    transform(dependentSchemas: ValueType) : OutputType {
        return {
            allOf: Object.entries(dependentSchemas).map(
                ([property, subSchema]) => ({
                    if: {
                      type: "object",
                      required: [property],
                    },
                    then: subSchema,
                })
            )
        }
    }
}