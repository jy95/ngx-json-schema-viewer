import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, forwardRef, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {
  CreateEdgeComponent
} from "../../common/index";

import type { JSONSchemaNS, JSONSchema } from '../../types';

@Component({
  selector: 'jse-array-contains',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    forwardRef(() => CreateEdgeComponent)
  ],
  template: `
    <ul *ngIf="item !== undefined">
      <jse-common-create-edge [schema]="item" [required]="isMinContainsValid()">
        <code name>
          {{ containsLabel }}
        </code>
      </jse-common-create-edge>
    </ul>
  `,
})
export class CreateContainsComponent implements OnInit {
  @Input({ required: true }) schema!: JSONSchemaNS.Array;

  item : JSONSchema | undefined = undefined;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.item = this.schema.contains;
    
    this.cdRef.markForCheck();
  }

  get containsLabel() {
    return `items[..., x, ...]`;
  }

  isMinContainsValid(): boolean {
    return this.schema.minContains !== undefined && this.schema.minContains > 0;
  }
}
