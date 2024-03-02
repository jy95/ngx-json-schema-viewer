
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types";

@Component({
  selector: 'jse-object-additional-properties',
  standalone: true,
  imports: [
    forwardRef(() => CreateEdgeComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!isUndefinedOrBoolean(additionalProperties)) {
      <ul>
        <jse-common-create-edge [schema]="additionalProperties!" [required]="false">
          <code name>
            {{ additionalPropertiesLabel() }}
          </code>
        </jse-common-create-edge>
      </ul>
    }
    `,
})
export class CreateAdditionalPropertiesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  get additionalProperties() {
    return this.schema.additionalProperties;
  }

  isUndefinedOrBoolean(value: any): boolean {
    return value === undefined || typeof value === 'boolean';
  }

  additionalPropertiesLabel(): string {
    return `property name*`;
  }
}
