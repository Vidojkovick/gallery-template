import { computed, Service, signal } from '@angular/core';
import { Photo } from '../../models/photo.model';

@Service()
export class FavoritesService {
    private readonly favoritesState = signal<Photo[]>(this.loadFavorites());

    private readonly STORAGE_KEY = 'favorites';

    readonly favorites = this.favoritesState.asReadonly();
    readonly ids = computed(() => new Set(this.favorites().map((photo) => photo.id)));

    getById(id: string): Photo | undefined {
        return this.favorites().find((photo) => photo.id === id);
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

    private loadFavorites(): Photo[] {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]') as Photo[];
        } catch {
            return [];
        }
    }

    private saveFavorites(favorites: Photo[]): void {
        this.favoritesState.set(favorites);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
}
