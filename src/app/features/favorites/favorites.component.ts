import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { Photo } from '../../core/models/photo.model';

@Component({
  imports: [
    PhotoGridComponent,
    EmptyStateComponent,
    RouterLink,
    MatButtonModule
  ],
  selector: 'app-favorites',
  styleUrl: './favorites.component.scss',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  protected readonly favorites: Signal<Photo[]>;

  constructor() {
    this.favorites = this.favoritesService.favorites
  }

  protected open(photo: Photo): void {
    this.router.navigate(['/photo', photo.id]);
  }
}
