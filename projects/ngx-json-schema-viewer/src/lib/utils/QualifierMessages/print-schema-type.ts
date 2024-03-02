
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'lib-print-schema-type',
  template: `
    @if (isSimpleType) {
      <code>{{ value }}</code>
    } @else {
      <pre><code [highlight]="jsonCode" [languages]="languages"></code></pre>
    }
    `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HighlightModule
]
})
export class PrintSchemaTypeComponent {
  @Input({ required: true }) obj!: unknown;

  get isSimpleType(): boolean {
    return ['string', 'number', 'bigint', 'boolean'].includes(typeof this.obj);
  }

  get jsonCode(): string {
    return JSON.stringify(this.obj, null, "\t");
  }

  get value(): string {
    return this.obj!.toString();
  }

  get languages(): string[] {
    return ["json"];
  }
}
