import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import { CreateNodesComponent } from "../../common/create-nodes";

import type { JSONSchema } from "../../types";

@Component({
  selector: 'jse-schema-composition-not',
  standalone: true,
  imports: [
    forwardRef(() => CreateNodesComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
        <span class="badge not">{{ typeOf }}</span>
        <br />
        <jse-common-create-nodes [schema]="typedSchema" />
    </div>
  `,
  styleUrls: ["./not.css"]
})
export class NotSchemaComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  get typedSchema(): JSONSchema {
    return this.schema.not!;
  }

  get typeOf(): string {
    return "not";
  }

}
