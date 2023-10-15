import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-read-only',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './read-only-label.component.html',
  styleUrls: ['./read-only-label.component.css']
})
export class ReadOnlyLabelComponent { }