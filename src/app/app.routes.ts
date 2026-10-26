import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Photos - Photo Gallery',
        loadComponent: () =>
            import('./features/photo-list/photo-list.component')
            .then((m) => m.PhotoListComponent)
    },
    {
        path: 'favorites',
        title: 'Favorites - Photo Gallery',
        loadComponent: () =>
            import('./features/favorites/favorites.component')
            .then((m) => m.FavoritesComponent)
    },
    {
        path: 'photo/:id',
        title: 'Photo Details - Photo Gallery',
        loadComponent: () =>
            import('./features/photo-details/photo-details.component')
            .then((m) => m.PhotoDetailsComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
