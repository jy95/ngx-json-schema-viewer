import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-string-length',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <strong>{{ lengthLabel }}</strong>&nbsp;
      <ng-container *ngIf="schema.minLength !== undefined">
        <code>{{ '>= ' + schema.minLength + ' character(s)' }}</code>
      </ng-container>
      <ng-container *ngIf="minAndMaxLength">
        <span>&nbsp;&&nbsp;</span>
      </ng-container>
      <ng-container *ngIf="schema.maxLength !== undefined">
        <code>{{ '<= ' + schema.maxLength + ' character(s)' }}</code>
      </ng-container>
    </div>
  `,
})
export class StringLengthComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

  lengthLabel = 'Length :';
  
  get minAndMaxLength(): boolean {
    return this.schema.minLength !== undefined && this.schema.maxLength !== undefined;
  }

}
