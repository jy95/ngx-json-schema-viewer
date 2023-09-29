import { Injectable } from '@angular/core';

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
    showExamples?: boolean
    /**
     * To overwrite the order to display qualifier messages
     * @default ["nullable","deprecated","readOnly","writeOnly","enum","stringLength","objectProperties","no-extra-properties","arrayItems","arrayContains","no-extra-items","number-range","pattern","multipleOf","uniqueItems","contentEncoding","contentMediaType","contentSchema","default","const","examples"]
     */
    qualifierMessagesOrder?: CheckKey[]
}

@Injectable({
    providedIn: 'root',
})
export class JSVOptionsService {
    private options: JSVOptions = {
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

    getOptions(): JSVOptions {
        return this.options;
    }

    getDefaultQualifierMessageOrder(): CheckKey[] {
        return [
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
}