import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from "../../types";

@Component({
  selector: 'jse-array-unevaluated-items',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul *ngIf="items !== undefined">
      <jse-common-create-edge [schema]="items" [required]="false">
        <code name>
          {{ unevaluatedItemsLabel() }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateUnevaluatedItemsComponent implements OnInit {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  items : JSONSchema | undefined = undefined;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.items = this.schema.unevaluatedItems;

      this.cdRef.markForCheck();
  }

  unevaluatedItemsLabel(): string {
    return `items[y]`;
  }
}
