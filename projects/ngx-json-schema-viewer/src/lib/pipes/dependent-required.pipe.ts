import { Pipe, PipeTransform } from '@angular/core';

import type { JSONSchema } from "../types";

type ValueType = Record<string, string[] | readonly string[]>;
type OutputType = Exclude<JSONSchema, true | false>;

@Pipe({ 
    name: 'dependentRequired',
    standalone: true 
})
export class DependentRequiredPipe implements PipeTransform {
    transform(dependentRequired: ValueType) : OutputType {
        return {
            allOf: Object.entries(dependentRequired).map(
                ([property, requiredProperties]) => ({
                    if: {
                      type: "object",
                      required: [property],
                    },
                    then: {
                      type: "object",
                      required: requiredProperties,
                    },
                })
            )
        }
    }
}