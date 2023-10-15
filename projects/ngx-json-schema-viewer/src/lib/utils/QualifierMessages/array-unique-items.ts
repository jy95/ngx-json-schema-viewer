import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qm-array-unique-items',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
      <strong>Unique items :</strong>
      &nbsp;
      <code>yes</code>
  </div>
  `
})
export class ArrayUniqueItemsComponent {}
