import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import {
  AndLabelComponent
} from "../../labels/index";

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-number-bounds',
  standalone: true,
  imports: [CommonModule, AndLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ boundsLabel }}</strong>&nbsp;
      <ng-container *ngIf="minimum !== undefined">
        <code>
          <span *ngIf="isExclusiveMinimum">&gt;</span>
          <span *ngIf="!isExclusiveMinimum">&ge;</span>
          {{ minimum }}
        </code>
      </ng-container>
      <ng-container *ngIf="minAndMax">
        <labels-and />
      </ng-container>
      <ng-container *ngIf="maximum !== undefined">
        <code>
          <span *ngIf="isExclusiveMaximum">&lt;</span>
          <span *ngIf="!isExclusiveMaximum">&le;</span>
          {{ maximum }}
        </code>
      </ng-container>
    </div>
  `,
})
export class NumberBoundsComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  // Props
  boundsLabel = 'Possible values :';
  minimum: number | undefined;
  isExclusiveMinimum = false;
  maximum: number | undefined;
  isExclusiveMaximum = false;
  minAndMax = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.minimum = this.schema.exclusiveMinimum || this.schema.minimum;
    this.isExclusiveMinimum = this.schema.exclusiveMinimum !== undefined;
    this.maximum = this.schema.exclusiveMaximum || this.schema.maximum;
    this.isExclusiveMaximum = this.schema.exclusiveMaximum !== undefined;
    this.minAndMax = this.minimum !== undefined && this.maximum !== undefined;

    this.cdRef.markForCheck();
  }
}
