import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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

  boundsLabel = 'Possible values :';
  
  get minimum() : number | undefined { 
    return this.schema.exclusiveMinimum || this.schema.minimum; 
  }

  get isExclusiveMinimum(): boolean {
    return this.schema.exclusiveMinimum !== undefined;
  }

  get maximum(): number | undefined {
    return this.schema.exclusiveMaximum || this.schema.maximum;
  }

  get isExclusiveMaximum() : boolean {
    return this.minimum !== undefined && this.maximum !== undefined;
  }

  get minAndMax() : boolean {
    return this.minimum !== undefined && this.maximum !== undefined;
  }

}
