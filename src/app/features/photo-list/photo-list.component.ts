import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-photo-list',
  styleUrl: './photo-list.component.scss',
  templateUrl: './photo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent {}
