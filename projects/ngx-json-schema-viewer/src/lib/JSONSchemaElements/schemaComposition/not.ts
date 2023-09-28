import { Component, Input } from '@angular/core';

import { CreateNodesComponent } from "@theme/JSONSchemaViewer/components/create-nodes.component";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-composition-not',
  standalone: true,
  imports: [],
  template: `
    <div>
        <span class="badge badge--info">{{ typeOf }}</span>
        <br />
        <app-create-nodes [schema]="compositeSchema"></app-create-nodes>
    </div>
  `,
})
export class NotSchemaComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): JSONSchema {
    return this.schema.not!;
  }

  get typeOf(): string {
    return "not";
  }

}
