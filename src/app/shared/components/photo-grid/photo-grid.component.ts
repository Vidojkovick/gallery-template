import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Photo } from '../../../core/models/photo.model';

@Component({
  imports: [MatIconModule, MatRippleModule],
  selector: 'app-photo-grid',
  styleUrl: './photo-grid.component.scss',
  templateUrl: './photo-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGridComponent {
  readonly photos = input.required<Photo[]>();
  readonly favoriteIds = input<Set<string>>(new Set());
  readonly photoClick = output<Photo>();
}
