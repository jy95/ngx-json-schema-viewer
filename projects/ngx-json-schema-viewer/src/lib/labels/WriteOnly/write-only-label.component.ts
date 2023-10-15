import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-write-only',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './write-only-label.component.html',
  styleUrls: ['./write-only-label.component.css']
})
export class WriteOnlyLabelComponent { }