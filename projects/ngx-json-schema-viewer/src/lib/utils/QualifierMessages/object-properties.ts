import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-object-properties',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <strong>{{ lengthLabel }}</strong>&nbsp;
      <ng-container *ngIf="schema.minProperties !== undefined">
        <code>
            {{ '>= ' + schema.minProperties + ' propertie(s)' }}
        </code>
      </ng-container>
      <ng-container *ngIf="minAndMax">
        <span>&nbsp;&&nbsp;</span>
      </ng-container>
      <ng-container *ngIf="schema.maxProperties !== undefined">
        <code>
            {{ '<= ' + schema.maxProperties + ' propertie(s)' }}
        </code>
      </ng-container>
    </div>
  `,
})
export class ObjectPropertiesComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;
  lengthLabel = 'Length :';

  minAndMax: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.minAndMax =
      this.schema.minProperties !== undefined &&
      this.schema.maxProperties !== undefined;

    this.cdRef.markForCheck();
  }
}
