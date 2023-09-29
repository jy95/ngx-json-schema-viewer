import { Injectable } from '@angular/core';
import { Resolver } from '@stoplight/json-ref-resolver';
import { Observable } from 'rxjs';

import type { IResolveOpts } from "@stoplight/json-ref-resolver/types"
import type { JSONSchema } from "../types";

@Injectable({
    providedIn: 'root',
})
export class SchemaResolutionService {

    resolveSchema(schema: unknown, resolverOptions?: IResolveOpts): Observable<JSONSchema> {
        return new Observable((observer) => {
          new Resolver()
            .resolve(schema, resolverOptions)
            .then((result) => {
              observer.next(result.result);
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        });
    }
}