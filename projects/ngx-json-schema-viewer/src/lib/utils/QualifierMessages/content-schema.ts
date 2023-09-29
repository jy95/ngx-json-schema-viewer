import { Component, Input } from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';

import {
  CreateNodesComponent
} from "../../common/index";

import type { JSONSchemaNS } from "../../types"

@Component({
  selector: 'qm-content-schema',
  standalone: true,
  imports: [MatExpansionModule,CreateNodesComponent],
  template: `
    <div>
      <strong>{{ contentSchemaLabel }}</strong>
      &nbsp;
      <mat-accordion>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ title }}
            </mat-panel-title>
          </mat-expansion-panel-header>
          <jse-common-create-nodes [schema]="schema.contentSchema!"/>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
})
export class ContentSchemaComponent {
  @Input({ required: true }) schema!: JSONSchemaNS.String;

  // Translated Label
  contentSchemaLabel = 'Decoded content must be validated against this schema :';

  // TODO maybe later refactor this name ...
  title = 'Schema';
}
