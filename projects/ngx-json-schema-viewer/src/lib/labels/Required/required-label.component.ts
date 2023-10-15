import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'labels-required',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './required-label.component.html',
  styleUrls: ['./required-label.component.css']
})
export class RequiredLabelComponent { }
