import { Component, Input } from '@angular/core';
import { JSONSchema } from '../../types';

@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
})
export class ConstantComponent {
  @Input() schema!: Exclude<JSONSchema, true | false>;

  // Function to print schema type
  printSchemaType(constValue: any): string {
    return String(constValue); // You may need to format this according to your requirements
  }
}
