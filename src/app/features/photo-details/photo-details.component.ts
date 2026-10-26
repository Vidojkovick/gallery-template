import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-photo-details',
  styleUrl: './photo-details.component.scss',
  templateUrl: './photo-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsComponent {}
