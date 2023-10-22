import { Pipe, PipeTransform } from '@angular/core';

import type { JSONSchema } from "../types";

type itemsType = { id: number; value: unknown; label: string }

type ValueType = Exclude<JSONSchema, true | false>;
type OutputType = itemsType[];

@Pipe({ 
    name: 'examplesList',
    standalone: true 
})
export class ExamplesListPipe implements PipeTransform {
    transform(schema: ValueType) : OutputType {
        return (schema.examples || [])
            .map((val, idx) => ({
            id: idx,
            value: val,
            label: `Example ${idx}`,
        }));
    }
}