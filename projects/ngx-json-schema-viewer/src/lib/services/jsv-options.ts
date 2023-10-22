import { Inject, Injectable, InjectionToken } from '@angular/core';

export type CheckKey =
  | "nullable"
  | "deprecated"
  | "readOnly"
  | "writeOnly"
  | "enum"
  | "stringLength"
  | "objectProperties"
  | "no-extra-properties"
  | "arrayItems"
  | "arrayContains"
  | "no-extra-items"
  | "number-range"
  | "pattern"
  | "multipleOf"
  | "uniqueItems"
  | "default"
  | "const"
  | "examples"
  | "contentMediaType"
  | "contentEncoding"
  | "contentSchema"

export type JSVOptions = {
    /**
     * Should we display "examples" ?
     * @default false
     */
    showExamples: boolean
    /**
     * To overwrite the order to display qualifier messages
     * @default ["nullable","deprecated","readOnly","writeOnly","enum","stringLength","objectProperties","no-extra-properties","arrayItems","arrayContains","no-extra-items","number-range","pattern","multipleOf","uniqueItems","contentEncoding","contentMediaType","contentSchema","default","const","examples"]
     */
    qualifierMessagesOrder: CheckKey[]
}

// Define an InjectionToken for JSVOptions
export const JSV_OPTIONS = new InjectionToken<Partial<JSVOptions>>('JSVOptions');

@Injectable({
    providedIn: "root"
})
export class JSVOptionsService {

    private options: JSVOptions;

    constructor(@Inject(JSV_OPTIONS) userOptions: Partial<JSVOptions>) {
        // Set default options
        this.options = {
            showExamples: false,
            qualifierMessagesOrder: [
                "nullable",
                "deprecated",
                "readOnly",
                "writeOnly",
                "enum",
                "stringLength",
                "objectProperties",
                "no-extra-properties",
                "arrayItems",
                "arrayContains",
                "no-extra-items",
                "number-range",
                "pattern",
                "multipleOf",
                "uniqueItems",
                "contentEncoding",
                "contentMediaType",
                "contentSchema",
                "default",
                "const",
                "examples"
            ]
        }
        // Apply user provided options
        this.setOptions(userOptions);
    }

    setOptions(userOptions?: Partial<JSVOptions>) {
        this.options = {
            ...this.options,
            ...userOptions
        }
    }

    getOptions(): JSVOptions {
        return this.options;
    }

}