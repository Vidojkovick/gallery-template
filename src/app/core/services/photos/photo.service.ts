import { Service, signal } from '@angular/core';
import { Photo } from '../../models/photo.model';
import { delay, Observable, of } from 'rxjs';

@Service()
export class PhotoService {
    private readonly photosState = signal<Photo[]>([]);
    private readonly loadingState = signal(false);

    private readonly PAGE_SIZE = 12;

    readonly photos = this.photosState.asReadonly();
    readonly loading = this.loadingState.asReadonly();

    constructor() {
        this.loadMorePhotos();
    }

    loadMorePhotos(): void {
        if (this.loadingState()) {
            return;
        }

        this.loadingState.set(true);

        this.fetchPhotos().subscribe((photosPage) => {
            this.photosState.update((photos) => [...photos, ...photosPage]);
            this.loadingState.set(false);
        });
    }

    private fetchPhotos(): Observable<Photo[]> {
        const photos = Array.from(
            { length:  this.PAGE_SIZE },
            () => PhotoService.createPhoto(this.randomId())
        );

        return of(photos).pipe(delay(300));
    }

    private randomId(): string {
        return Math.random().toString(36).slice(2,12);
    }

    static createPhoto(id: string): Photo {
        return {
            id,
            thumbnailUrl: `https://picsum.photos/seed/${id}/200/300`,
            fullUrl: `https://picsum.photos/seed/${id}/1200/1800`
        }
    }
}
