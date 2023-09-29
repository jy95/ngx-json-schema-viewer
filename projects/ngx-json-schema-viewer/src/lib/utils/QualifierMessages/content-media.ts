import { Component, Input } from '@angular/core';
import { PrintSchemaTypeComponent } from './print-schema-type';

import type { JSONSchema } from '../../types';

@Component({
  selector: 'qm-content-media-type',
  standalone: true,
  imports: [PrintSchemaTypeComponent],
  template: `
    <div key="contentMediaType">
      <strong>Media type :</strong>
      &nbsp;
      <lib-print-schema-type [obj]="schema.contentMediaType"] />
    </div>
  `,
})
export class ContentMediaTypeComponent {
  @Input({ required: true }) schema!: Exclude<JSONSchema, true | false>;

}
