import { Pipe, PipeTransform } from '@angular/core';

import type { JSONSchema } from "../types";

type ValueType = Record<string, string[] | readonly string[] | JSONSchema>;
type OutputType = Record<string, JSONSchema>;

@Pipe({ 
    name: 'dependanciesTodependentSchemas',
    standalone: true 
})
export class DependanciesToDependentSchemasPipe implements PipeTransform {
    transform(dependentSchemas: ValueType) : OutputType {
        const result: Record<string, JSONSchema> = {};

        if (dependentSchemas) {
            for (const [property, subSchema] of Object.entries(dependentSchemas)) {
                if (!Array.isArray(subSchema)) {
                    // dependentSchemas case
                    result[property] = subSchema as JSONSchema;
                }
            }
        }

        return result;
    }
}