
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import {
    GenerateFriendlyNameComponent
} from "../utils/index";

import {
    RequiredLabelComponent,
    ReadOnlyLabelComponent,
    WriteOnlyLabelComponent,
    DeprecatedLabelComponent
} from "../labels/index";

import {
    CreateNodesComponent
} from "./index";

import type { JSONSchema, JSONSchema_Draft_2019_09 } from '../types';

@Component({
  selector: 'jse-common-create-edge',
  standalone: true,
  imports: [
    MatExpansionModule,
    GenerateFriendlyNameComponent,
    RequiredLabelComponent,
    ReadOnlyLabelComponent,
    WriteOnlyLabelComponent,
    DeprecatedLabelComponent,
    forwardRef(() => CreateNodesComponent)
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="schemaItem">
      <mat-accordion>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              <ng-content select="[name]" />
              &nbsp;
              <jsv-friendly-name [schema]="schema" />
            </mat-panel-title>
            <mat-panel-description>
              @if (isRequired) {
                <labels-required />
              }
              @if (isDeprecated) {
                <labels-deprecated />
              }
              @if (isReadOnly) {
                <labels-read-only />
              }
              @if (isWriteOnly) {
                <labels-write-only />
              }
            </mat-panel-description>
          </mat-expansion-panel-header>
          <ng-template matExpansionPanelContent>
            <jse-common-create-nodes [schema]="schema" />
          </ng-template>
        </mat-expansion-panel>
      </mat-accordion>
    </li>
    `,
  styleUrls: ['./create-edge.component.css']
})
export class CreateEdgeComponent {
  @Input({ required: true }) schema!: JSONSchema;
  @Input({ required: true }) required!: boolean;

  get isDeprecated(): boolean {
    const typedSchema = this.schema as JSONSchema_Draft_2019_09;
    return typeof typedSchema !== "boolean" && typedSchema.deprecated === true;
  }

  get isReadOnly(): boolean {
    return typeof this.schema !== "boolean" && this.schema.readOnly === true;
  }

  get isWriteOnly(): boolean {
    return typeof this.schema !== "boolean" && this.schema.writeOnly === true;
  }

  get isRequired(): boolean {
    return !this.isDeprecated && this.required;
  }
}
