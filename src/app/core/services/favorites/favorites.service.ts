import { computed, Service, signal } from '@angular/core';
import { EffectType, Photo } from '../../models/photo.model';

const STORAGE_KEY = 'favorites';

@Service()
export class FavoritesService {
  private readonly favoritesState = signal<Photo[]>(this.loadFavorites());

  readonly favorites = this.favoritesState.asReadonly();
  readonly ids = computed(() => new Set(this.favorites().map((photo) => photo.id)));

  getById(id: string, effect: EffectType | undefined = EffectType.None): Photo | undefined {
    const photoToConvert = this.favorites().find((photo) => photo.id === id);

    if (effect) {
      return this.applyEffect(photoToConvert, effect);
    }

    return photoToConvert;
  }

  addFavorite(photo: Photo): boolean {
    if (this.ids().has(photo.id)) {
      return false;
    }

    this.saveFavorites([photo, ...this.favorites()]);

    return true;
  }

  removeFavorite(photoId: string): void {
    this.saveFavorites(this.favorites().filter((p) => p.id !== photoId));
  }

  applyEffect(
    photo: Photo | undefined,
    effect: EffectType | undefined,
  ): Photo | undefined {
    if (!photo) {
      return;
    }

    return {
      ...photo,
      fullUrl: photo.fullUrl + effect,
      thumbnailUrl: photo.thumbnailUrl + effect,
    };
  }

  private loadFavorites(): Photo[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Photo[];
    } catch {
      return [];
    }
  }

  private saveFavorites(favorites: Photo[]): void {
    this.favoritesState.set(favorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}
