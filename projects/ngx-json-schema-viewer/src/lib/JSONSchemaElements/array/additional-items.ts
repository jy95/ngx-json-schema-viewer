import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from '../../types';

@Component({
  selector: 'jse-array-additional-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="items !== undefined">
      <jse-common-create-edge [schema]="items" [required]="isMinItemsValid()">
        <code name>
          {{ additionalItemsLabel(startingIndex) }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateAdditionalItemsComponent implements OnInit {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  items : JSONSchema | undefined = undefined;
  startingIndex : number = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    let isUndefinedOrBoolean = this.schema === undefined || typeof this.schema === 'boolean';
    if (!isUndefinedOrBoolean) {
      this.items = this.schema.additionalItems;
      this.startingIndex = Array.isArray(this.schema.items) ? this.schema.items.length : 1;
      
      this.cdRef.markForCheck();
    }
  }

  isMinItemsValid(): boolean {
    return (
      this.schema.minItems !== undefined && this.startingIndex >= this.schema.minItems - 1
    );
  }

  additionalItemsLabel(count: number): string {
    return `items[${count},...]`;
  }
}
