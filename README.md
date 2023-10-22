<h1 align="center">ngx-json-schema-viewer</h1>

<div align="center">
<img width="200" src="https://raw.githubusercontent.com/jy95/ngx-json-schema-viewer/master/logo.svg" />
</div>

<div align="center">

JSON Schema viewer in Angular

<img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=meta&color=blueviolet&label=Angular&query=peerDependencies%5B%22%40angular%2Fcore%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Fjy95%2Fngx-json-schema-viewer%2Fmaster%2Fprojects%2Fngx-json-schema-viewer%2Fpackage.json" />
<br/><br/>

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://github.com/jy95/ngx-json-schema-viewer/blob/main/LICENSE) [![npm latest package](https://img.shields.io/npm/v/ngx-json-schema-viewer/latest.svg)] [![npm downloads](https://img.shields.io/npm/dm/ngx-json-schema-viewer.svg)] [![Codacy Badge](https://app.codacy.com/project/badge/Grade/43d9fa27054841f5a884afc88188ef01)](https://app.codacy.com/gh/jy95/ngx-json-schema-viewer/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jy95/ngx-json-schema-viewer/blob/main/CONTRIBUTING.md) [![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) <a href="https://www.buymeacoffee.com/GPFR" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="41" width="174" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;" ></a>
<br />

</div>


---

## Overview

Key Features:

- **Compatible:** Works with JSON Schema Draft-07 / Draft 2019-09 / Draft 2020-12
- **Human-friendly** Make exploration of specs a delightful experience

Storybook : https://master--65174c82cd070b9998efd7f6.chromatic.com/

## Installation

```bash
npm install ngx-json-schema-viewer
```

## Usage

```ts
import { NgxJsonSchemaViewerComponent, JSV_OPTIONS } from "ngx-json-schema-viewer";
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxJsonSchemaViewerComponent],
  providers: [
    { 
      provide: JSV_OPTIONS, 
      useValue: {} 
    }
  ],
  template: `
    <div>
      <ngx-json-schema-viewer [schema]="jsonSchema"></ngx-json-schema-viewer>
    </div>
  `
})
export class AppComponent {
  // Your JSON Schema here
  jsonSchema = {
    "type": "array",
    "items": [
        {
            "type": "integer"
        },
        {
            "type": "string"
        }
    ],
    "additionalItems": false
  };
}
```

## Inputs

|  Parameter   | Type   | Mandatory | Description |
|-----------------|----------|-----------|-----------|
| `schema` | JSON Schema | Yes         | The JSON schema object to be displayed |
| `resolverOptions`    | `IResolveOpts`         | No         | Additional options for schema resolution. It accepts an object of type `IResolveOpts`. If not provided, the component will use default options. |

**Note**: For more information on `IResolveOpts`, refer to the [GitHub page of @stoplight/json-ref-resolver](https://github.com/stoplightio/json-ref-resolver).

## Providers

### JSV_OPTIONS 

| Field Name                    | Description                                  | Type       | Default Value |
|-------------------------------|----------------------------------------------|------------|---------------|
| `showExamples`               | Controls whether to display "examples."     | `boolean`  | `false`       |
| `qualifierMessagesOrder`     | Defines the order of qualifier messages.    | `CheckKey[]` | Default order: `["nullable", "deprecated", "readOnly", "writeOnly", "enum", "stringLength", "objectProperties", "no-extra-properties", "arrayItems", "arrayContains", "no-extra-items", "number-range", "pattern", "multipleOf", "uniqueItems", "contentEncoding", "contentMediaType", "contentSchema", "default", "const", "examples"]` |

## Credits

Special thanks to [docusaurus-json-schema-plugin](https://github.com/jy95/docusaurus-json-schema-plugin), which this project ported it to the Angular world.

## Contributors

<a href="https://github.com/jy95/ngx-json-schema-viewer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jy95/ngx-json-schema-viewer" />
</a>
