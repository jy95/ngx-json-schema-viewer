import { Component, Input } from '@angular/core';

import type { JSONSchemaNS } from "../../types"

@Component({
  selector: 'qm-content-schema',
  template: `
    <div>
      <strong>{{ contentSchemaLabel }}</strong>
      &nbsp;
      <app-collapsible [open]="true">
        <strong>{{ title }}</strong>
        <app-create-nodes [schema]="schema.contentSchema"></app-create-nodes>
      </app-collapsible>
    </div>
  `,
})
export class ContentSchemaComponent {
  @Input() schema!: JSONSchemaNS.String;

  // Translated Label
  contentSchemaLabel = 'Decoded content must be validated against this schema :';

  // TODO maybe later refactor this name ...
  title = 'Schema';
}
