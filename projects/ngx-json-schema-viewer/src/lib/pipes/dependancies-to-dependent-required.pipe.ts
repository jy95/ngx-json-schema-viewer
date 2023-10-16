import { Pipe, PipeTransform } from '@angular/core';

import type { JSONSchema } from "../types";

type ValueType = Record<string, string[] | readonly string[] | JSONSchema>;
type OutputType = Record<string, string[] | readonly string[]>;

@Pipe({ 
    name: 'dependanciesTodependentRequired',
    standalone: true 
})
export class DependanciesToDependentRequiredPipe implements PipeTransform {
    transform(dependentRequired: ValueType) : OutputType {
        const result: Record<string, string[] | readonly string[]> = {};

        for (const [property, subSchema] of Object.entries(dependentRequired)) {
            if (Array.isArray(subSchema)) {
              // dependentRequired case
              result[property] = subSchema;
            }
        }

        return result;
    }
}