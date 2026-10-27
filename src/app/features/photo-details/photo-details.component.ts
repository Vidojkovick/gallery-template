import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [EmptyStateComponent, RouterLink, MatButtonModule, MatIconModule],
  selector: 'app-photo-details',
  styleUrl: './photo-details.component.scss',
  templateUrl: './photo-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsComponent {
  readonly id = input.required<string>();

  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly photo = computed(() => this.favoritesService.getById(this.id()));

  protected remove(): void {
    this.favoritesService.removeFavorite(this.id());

    this.snackBar.open('Removed from favorites', undefined, { duration: 2000 });
    this.router.navigate(['/favorites']);
  }
}
