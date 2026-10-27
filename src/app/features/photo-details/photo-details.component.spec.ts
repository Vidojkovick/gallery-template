import { TestBed } from '@angular/core/testing';
import { PhotoDetailsComponent } from './photo-details.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { PhotoService } from '../../core/services/photos/photo.service';
import { EffectType } from '../../core/models/photo.model';

describe('PhotoDetailsComponent', () => {
  let routerHarness: RouterTestingHarness;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
        provideRouter([
          { path: 'photo/:id', component: PhotoDetailsComponent },
          { path: 'favorites', children: [] }
        ], withComponentInputBinding())
      ]
    });

    favoritesService = TestBed.inject(FavoritesService);
    favoritesService.addFavorite(PhotoService.createPhoto('abc'));

    routerHarness = await RouterTestingHarness.create();
  });

  async function navigateToUrl(route: string): Promise<void> {
    await routerHarness.navigateByUrl(route);
  }

  it('should show the full size photo', async () => {
    await navigateToUrl('/photo/abc');
    const img = routerHarness.routeNativeElement!.querySelector('img');
    expect(img?.getAttribute('src')).toBe(PhotoService.createPhoto('abc').fullUrl);
  });

  it('should remove photo and go back to favorites', async () => {
    await navigateToUrl('/photo/abc');
    (routerHarness.routeNativeElement!.querySelector('.detail__remove') as HTMLButtonElement).click();
    await routerHarness.fixture.whenStable();

    expect(favoritesService.favorites()).toEqual([]);
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/favorites');
  });

  it.each([
    ['grayscale', EffectType.Grayscale],
    ['blur', EffectType.Blur]
  ])('should %s photo or revert to normal', async (cls: string, type: EffectType) => {
    await navigateToUrl('/photo/abc');
    const el = routerHarness.routeNativeElement!;
    const base = PhotoService.createPhoto('abc').fullUrl;
    const button = () => el.querySelector(`.detail__${cls}`) as HTMLButtonElement;

    button().click();
    await routerHarness.fixture.whenStable();
    expect(el.querySelector('img')?.getAttribute('src')).toBe(base + type);

    button().click();
    await routerHarness.fixture.whenStable();
    expect(el.querySelector('img')?.getAttribute('src')).toBe(base);
  });

  it('should show "not found" for an unknown id', async () => {
    await navigateToUrl('/photo/nope');
    expect(routerHarness.routeNativeElement!.textContent).toContain('Photo not found');
  })
});
