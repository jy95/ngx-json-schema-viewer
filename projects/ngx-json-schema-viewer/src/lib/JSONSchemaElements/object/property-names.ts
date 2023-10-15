import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-object-property-names',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul *ngIf="schema.propertyNames !== undefined">
      <jse-common-create-edge [schema]="schema.propertyNames" [required]="false">
        <code name>
          {{ generatePropertyName() }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class PropertyNamesComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.Object;

  generatePropertyName(): string {
    let pattern = "^.+$";
    return `${pattern}`;
  }

}
