import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-deprecated',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deprecated-label.component.html',
  styleUrls: ['./deprecated-label.component.css']
})
export class DeprecatedLabelComponent { }