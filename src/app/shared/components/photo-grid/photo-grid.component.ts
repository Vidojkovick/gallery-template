import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-photo-grid',
  styleUrl: './photo-grid.component.scss',
  templateUrl: './photo-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGridComponent {}
