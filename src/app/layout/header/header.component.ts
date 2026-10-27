import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly router = inject(Router);
  protected readonly favorites = inject(FavoritesService).favorites;

  private readonly url = toSignal(this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url)
  ), { initialValue: this.router.url });

  protected readonly isPhotosActive = computed(() => this.url() === '/');
}
