import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import {
    StringLabelComponent,
    NumberLabelComponent,
    BooleanLabelComponent,
    ObjectLabelComponent,
    ArrayLabelComponent,
    IntegerLabelComponent,
    NullLabelComponent,
    TrueLabelComponent,
    FalseLabelComponent
} from "../labels/index";

import type { TypeValues } from "../types"

@Component({
  selector: 'jsv-type-label-switch',
  standalone: true,
  imports: [
    StringLabelComponent,
    NumberLabelComponent,
    BooleanLabelComponent,
    ObjectLabelComponent,
    ArrayLabelComponent,
    IntegerLabelComponent,
    NullLabelComponent,
    TrueLabelComponent,
    FalseLabelComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
@switch (type) {
  @case ('string') {
    <labels-string />
  }
  @case ('number') {
    <labels-number />
  }
  @case ('boolean') {
    <labels-boolean />
  }
  @case ('object') {
    <labels-object />
  }
  @case ('array') {
    <labels-array />
  }
  @case ('integer') {
    <labels-integer />
  }
  @case ('null') {
    <labels-null />
  }
  @case (true) {
    <labels-true />
  }
  @case (false) {
    <labels-false />
  }
  @default {
    <span style="opacity: 0.6">{{ type }}</span>
  }
}
`,
})
export class TypeLabelSwitchComponent {
  @Input({ required: true }) type!: TypeValues | true | false | string;
}
