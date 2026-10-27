import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { provideRouter, Router } from '@angular/router';
import { PhotoService } from '../../core/services/photos/photo.service';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let nativeElement: HTMLElement;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    localStorage.clear();
  
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    favoritesService = TestBed.inject(FavoritesService);
    fixture = TestBed.createComponent(FavoritesComponent);
  
    await fixture.whenStable();
    nativeElement = fixture.nativeElement;
  });

  it('should show an empty state with a link to the photostream', () => {
    expect(nativeElement.textContent).toContain('No favorites yet');
  });

  it('list all favorites', () => {
    for (let i = 0; i < 30; i++) {
      favoritesService.addFavorite(PhotoService.createPhoto(`p${i}`));
    }

    fixture.detectChanges();

    expect(nativeElement.querySelectorAll('button.tile')).toHaveLength(30);
  });

  it('opens the photo page when a photo is clicked', () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    favoritesService.addFavorite(PhotoService.createPhoto('abc'));

    fixture.detectChanges();

    (nativeElement.querySelector('button.tile') as HTMLButtonElement).click();
    expect(navigate).toHaveBeenCalledWith(['/photo', 'abc']);
  });
});
