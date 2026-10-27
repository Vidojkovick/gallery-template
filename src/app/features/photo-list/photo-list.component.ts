import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhotoService } from '../../core/services/photos/photo.service';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Photo } from '../../core/models/photo.model';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';

@Component({
  imports: [PhotoGridComponent, MatProgressSpinnerModule, InfiniteScrollDirective],
  selector: 'app-photo-list',
  styleUrl: './photo-list.component.scss',
  templateUrl: './photo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent {
  protected readonly photoService = inject(PhotoService);
  protected readonly favoritesService = inject(FavoritesService);

  private readonly snackBar = inject(MatSnackBar);

  protected addToFavorites(photo: Photo): void {
    const added = this.favoritesService.addFavorite(photo);

    const message = added ? 'Added to favorites' : 'Already in favorites';
    
    this.snackBar.open(message, undefined, { duration: 2000 });
  }
}
